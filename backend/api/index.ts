import * as express from 'express';          // namespace import
import * as serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module'; // chemin selon ton projet

const app = express();
app.use(express.json());

// Route test simple
app.get('/utilisateurs/faker', (req, res) => {
    res.json({ message: 'Route Faker OK' });
});

async function bootstrap() {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
    await nestApp.init();
}

bootstrap();

export const handler = serverless(app);  // <-- PAS de .default
