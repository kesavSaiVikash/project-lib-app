import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  AttributeType,
  Table as DynamoDbTable,
  ITable,
} from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  HttpMethods,
  IBucket,
  ObjectOwnership,
} from "aws-cdk-lib/aws-s3";

export class DataStack extends Stack {
  public readonly projectsTable: ITable;
  public readonly photosBucket: IBucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    this.projectsTable = this.createProjectsTable();

    this.photosBucket = new Bucket(this, "ProjectLibrary", {
      bucketName: `project-library-photos-${suffix}`,

      cors: [
        {
          allowedMethods: [HttpMethods.HEAD, HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],

      // accessControl: BucketAccessControl.PUBLIC_READ,

      objectOwnership: ObjectOwnership.OBJECT_WRITER,

      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });

    new CfnOutput(this, "ProjectLibraryBucketName", {
      value: this.photosBucket.bucketName,
    });
  }

  private createProjectsTable(): ITable {
    const suffix = getSuffixFromStack(this);
    return new DynamoDbTable(this, "ProjectsTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: `ProjectsTable-${suffix}`,
    });
  }
}