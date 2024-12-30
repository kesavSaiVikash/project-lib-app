import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { parseJSON } from "../Utils";

export async function UpdateProject(
  event: APIGatewayProxyEvent,
  context: Context,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.body && "id" in parseJSON(event.body)) {
    const parsedBody = parseJSON(event.body);

    const projectId = parsedBody["id"];

    const requestBodyKey = Object.keys(parsedBody).find((key) => key !== "id");

    const requestBodyValue = parsedBody[requestBodyKey];

    const updateResult = await ddbClient.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: projectId },
        },
        UpdateExpression: "set #zzzNew = :new",
        ExpressionAttributeValues: {
          ":new": {
            S: requestBodyValue,
          },
        },
        ExpressionAttributeNames: {
          "#zzzNew": requestBodyKey,
        },
        ReturnValues: "UPDATED_NEW",
      })
    );

    return {
      statusCode: 204,
      // body: JSON.stringify(updateResult.Attributes),
      body: `Update Succesfull changed ${projectId} to be : ${requestBodyValue}`,
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify("Please provide right args!!"),
  };
}
