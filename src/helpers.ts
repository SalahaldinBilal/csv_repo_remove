import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv'
import type { CsvFile } from "./types";
dotenv.config();

const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
});

export async function deleteS3File(file: CsvFile) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: file
  })

  return await client.send(command)
}