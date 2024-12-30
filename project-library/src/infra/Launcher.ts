import { App } from "aws-cdk-lib";
import { ApiStack } from "./stacks/ApiStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { DataStack } from "./stacks/DataStack";
import { AuthStack } from "./stacks/AuthStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";

const app = new App();

const dataStack = new DataStack(app, "ProjectsDataStack");

const lambdaStack = new LambdaStack(app, "ProjectsLambdaStack", {
  projectsTable: dataStack.projectsTable,
});

const authStack = new AuthStack(app, "ProjectsAuthStack", {
  photosBucket: dataStack.photosBucket,
});

new ApiStack(app, "ProjectsApiStack", {
  projectsLambdaIntegration: lambdaStack.projectsLambdaIntegration,
  userPool: authStack.userPool,
});

new UiDeploymentStack(app, "ProjectsUiDeploymentStack", {});
