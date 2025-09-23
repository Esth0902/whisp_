import serverless from "serverless-http";
import express from "express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExpressAdapter } from "@nestjs/platform-express";

const app = express();
const bootstrap = async () => {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
    await nestApp.init();
};
bootstrap();

export const handler = serverless(app);
