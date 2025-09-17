import { Controller, Post, Get, Param,Body,Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import {Prisma} from '@prisma/client'

@Controller('message')
export class MessageController {
    constructor(private readonly service: MessageService) {}

    @Post()
    envoyerMessage(@Body() data:Prisma.MessageCreateInput) {
        return this.service.envoyerMessage(data)
    }

    @Get('conversation/conversationId')
    LireMessageConversation(@Param('conversationId') conversationId: string) {
        return this.service.lireMessagesConversation(Number(conversationId));
    }

    @Delete('conversation/:id')
    supprimerConversation(@Param('id') id: string) {
        return this.service.supprimerConversation(Number(id));
    }

}
