import { Module } from '@nestjs/common';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [ClerkWebhookController],
    providers: [PrismaService],
})
export class AuthModule {}
