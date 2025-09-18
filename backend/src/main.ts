import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Active et configure CORS ici
    app.enableCors({
        origin: "https://whisp-alpha.vercel.app",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // Autorise les cookies/headers d'auth
    });

    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();