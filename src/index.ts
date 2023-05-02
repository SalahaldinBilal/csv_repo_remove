import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { deleteS3File, response } from './helpers';
import type { CsvFile } from './types';
dotenv.config();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const csvFileToUpload: CsvFile | undefined = event.pathParameters?.name;

    if (!csvFileToUpload?.length) return response(400, "Empty or non existent file name");

    await deleteS3File(decodeURIComponent(csvFileToUpload));
    return response(200, "File deleted successfully")
  }
  catch (error) {
    return response(500, `Unexpected Error Happened: ${error}`)
  }
};