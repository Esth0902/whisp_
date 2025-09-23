import express from 'express';                  // <- default import
import serverless from 'serverless-http';       // <- default import
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../app.module';      // si app.module est dans src/

const app = express();

async function bootstrap() {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
    await nestApp.init();
}

bootstrap();

export const handler = serverless(app);
