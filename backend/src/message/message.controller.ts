import { Controller, Post, Get, Param,Body } from '@nestjs/common';
import { MessageService } from './message.service';
import {Prisma} from '@prisma/client'

@Controller('message')
export class MessageController {
    constructor(private readonly service: MessageService) {}

    @Post()
    envoyerMessage(
        @Body()
        body: { utilisateurId: number; conversationId: number; contenu: string },
    ) {
        return this.service.envoyerMessage(
            body.utilisateurId,
            body.conversationId,
            body.contenu,
        );
    }

    @Get('conversation/conversationId')
    LireMessageConversation(@Param('conversationId') conversationId: string) {
        return this.service.lireMessagesConversation(Number(conversationId));
    }



}
