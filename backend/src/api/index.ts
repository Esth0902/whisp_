import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../app.module';

async function bootstrap() {
    const app = express();
    app.use(express.json());

    // Route test simple
    app.get('/utilisateurs/faker', (req, res) => {
        res.json({ message: 'Route Faker OK' });
    });

    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));

    // Active CORS si besoin ici (ajuster l’origin)
    nestApp.enableCors({
        origin: [
            'https://whisp-bt75.onrender.com',
            'http://localhost:3000',
        ],
        credentials: true,
    });

    await nestApp.init();

    // Écoute le port Render ou le port local
    const port = process.env.PORT ?? 4000;
    await app.listen(port);
    console.log(`Server listening on port ${port}`);
}

bootstrap();
