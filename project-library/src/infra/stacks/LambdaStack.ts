import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  projectsTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly projectsLambdaIntegration: LambdaIntegration;

  private projectsLambda: NodejsFunction;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    this.initializeLambda(props);

    this.addRoleToLambda(props);

    this.projectsLambdaIntegration = this.lambdaIntegration();
  }

  private initializeLambda(props: LambdaStackProps) {
    this.projectsLambda = new NodejsFunction(this, "ProjectsLambda", {
      runtime: Runtime.NODEJS_LATEST,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "projects", "handler.ts"),
      environment: {
        TABLE_NAME: props.projectsTable.tableName,
      },
    });
  }

  private addRoleToLambda(props: LambdaStackProps) {
    this.projectsLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.projectsTable.tableArn],
        actions: [
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
      })
    );
  }

  private lambdaIntegration(): LambdaIntegration {
    return new LambdaIntegration(this.projectsLambda);
  }
}
