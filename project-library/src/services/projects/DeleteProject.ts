import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Context,
} from "aws-lambda";
import { hasAdminGroup } from "../Utils";

export async function DeleteProject(
  event: APIGatewayProxyEvent,
  context: Context,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (!hasAdminGroup(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify(`Not authorized!`),
    };
  }

  if (event.body && "id" in JSON.parse(event.body)) {
    const parsedBody = JSON.parse(event.body);

    const projectId = parsedBody["id"];

    const getItemResponse = await ddbClient.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: projectId },
        },
      })
    );

    if (!getItemResponse.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify(`Project with id ${projectId} not found!`),
      };
    }

    await ddbClient.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: projectId },
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(`Deleted Project with id ${projectId}`),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify("Please provide right args!!"),
  };
}
