import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  MethodOptions,
  ResourceOptions,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  projectsLambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  private api: RestApi;
  private authorizer: CognitoUserPoolsAuthorizer;
  private optionsWithAuth: MethodOptions;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    this.initializeApi(props);

    this.addProjectsResource(props.projectsLambdaIntegration);
  }

  private initializeApi(props: ApiStackProps) {
    this.api = new RestApi(this, "ProjectsApi");

    this.authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "ProjectsApiAuthorizer",
      {
        cognitoUserPools: [props.userPool],
        identitySource: "method.request.header.Authorization",
      }
    );

    this.optionsWithAuth = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: this.authorizer,
    };
  }

  private addProjectsResource(projectsLambdaIntegration: LambdaIntegration) {
    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    };

    const projectsResource = this.api.root.addResource(
      "projects",
      optionsWithCors
    );

    projectsResource.addMethod(
      "GET",
      projectsLambdaIntegration
      // this.optionsWithAuth
    );

    projectsResource.addMethod(
      "POST",
      projectsLambdaIntegration,
      this.optionsWithAuth
    );

    projectsResource.addMethod(
      "PUT",
      projectsLambdaIntegration,
      this.optionsWithAuth
    );

    projectsResource.addMethod(
      "DELETE",
      projectsLambdaIntegration,
      this.optionsWithAuth
    );
  }
}
