import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import express from "express";

const s3Config = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY as string,
        secretAccessKey: process.env.DO_SPACES_SECRET as string,
    },
    endpoint: process.env.DO_SPACES_ENDPOINT,
    forcePathStyle: true,
});

const upload = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: process.env.DO_SPACES_NAME as string,
        acl: "public-read",
        key: (
            request: express.Request,
            file: Express.Multer.File,
            cb: (error: any, key?: string) => void
        ) => {
            const uniqueKey =
                "practice/" + Date.now().toString() + "-" + file.originalname;
            cb(null, uniqueKey);
        },
    }),
}).any();

export default upload;
