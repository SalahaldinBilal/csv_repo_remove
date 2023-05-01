import type { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { deleteS3File } from './helpers';
import type { CsvFile } from './types';
dotenv.config();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const csvFileToUpload: CsvFile | undefined = event.pathParameters?.name;

    if (!csvFileToUpload?.length) {
      return {
        statusCode: 400,
        body: "Empty or non existent file name"
      }
    }

    await deleteS3File(csvFileToUpload);
    return {
      statusCode: 200,
      body: "File deleted successfully"
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      body: `Unexpected Error Happened: ${error}`
    }
  }
};