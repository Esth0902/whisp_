import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('clerk-webhook')
export class ClerkWebhookController {
    constructor(private prisma: PrismaService) {}

    @Post()
    @HttpCode(200)
    async handleWebhook(@Body() body: any) {
        switch (body.type) {
            case 'user.created':
                await this.prisma.utilisateur.upsert({
                    where: { clerkId: body.data.id },
                    update: {
                        nom: `${body.data.username}`,
                        email: body.data.email_addresses[0]?.email_address,
                    },
                    create: {
                        clerkId: body.data.id,
                        nom: `${body.data.username}`,
                        email: body.data.email_addresses[0]?.email_address,
                    },
                });
                break;

            case 'user.updated':
                await this.prisma.utilisateur.update({
                    where: { clerkId: body.data.id },
                    data: {
                        nom: `${body.data.username}`,
                        email: body.data.email_addresses[0]?.email_address,
                    },
                });
                break;

            case 'user.deleted':
                await this.prisma.utilisateur.delete({
                    where: { clerkId: body.data.id },
                });
                break;

            default:
                // Ignorer les autres événements
                break;
        }

        return { received: true };
    }
}
