import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { GetProjects } from "./GetProjects";
import { PostProject } from "./PostProject";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { JsonError, MissingFieldError } from "../Validator";
import { addCorsHeader } from "../Utils";
import { UpdateProject } from "./UpdateProject";
import { DeleteProject } from "./DeleteProject";

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let response: APIGatewayProxyResult;

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await GetProjects(event, context, ddbClient);
        response = getResponse;
        break;

      case "POST":
        const postRespone = await PostProject(event, context, ddbClient);
        response = postRespone;
        break;

      case "PUT":
        const putResponse = await UpdateProject(event, context, ddbClient);
        response = putResponse;
        break;

      case "DELETE":
        const deleteResponse = await DeleteProject(event, context, ddbClient);
        response = deleteResponse;
        break;

      default:
        break;
    }

    addCorsHeader(response);

    return response;
  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    return {
      statusCode: 500,
      body: error.message,
    };
  }
}

export { handler };
