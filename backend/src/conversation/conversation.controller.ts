import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Prisma } from '@prisma/client';

@Controller('conversation')
export class ConversationController {
    constructor(private readonly service: ConversationService) {}

    @Post()
    creerConversation(@Body() data: Prisma.ConversationCreateInput) {
        return this.service.creerConversation(data);
    }

    @Get('utilisateur/:utilisateurId')
    lireConversationParId(@Param('id') id: string) {
        return this.service.lireConversationParId(Number(id));
    }

    @Delete(':id')
    supprimerConversation(@Param('id') id: string) {
        return this.service.supprimerConversation(Number(id));
    }

}
