import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function GetProjects(
  event: APIGatewayProxyEvent,
  context: Context,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      const projectId = event.queryStringParameters["id"];

      const getItemResponse = await ddbClient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: projectId },
          },
        })
      );

      if (getItemResponse.Item) {
        const unmashalledItem = unmarshall(getItemResponse.Item);
        return {
          statusCode: 200,
          body: JSON.stringify(unmashalledItem),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify(`Project with id ${projectId} not found!`),
        };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify("Id required!"),
      };
    }
  }

  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );
  const unmashalledItems = result.Items?.map((item) => unmarshall(item));
  console.log(unmashalledItems);

  return {
    statusCode: 201,
    body: JSON.stringify(unmashalledItems),
  };
}
