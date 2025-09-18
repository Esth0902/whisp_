import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Prisma } from '@prisma/client';

@Controller('conversation')
export class ConversationController {
    constructor(private readonly service: ConversationService) {}

    @Post()
    creerConversation(
        @Body() body: { participantsIds: number[]; nom?: string },
    ) {
        return this.service.creerConversation(body.participantsIds, body.nom);
    }

    @Get('utilisateur/:utilisateurId')
    lireConversationsUtilisateur(@Param('utilisateurId') utilisateurId: string) {
        return this.service.lireConversationsUtilisateur(Number(utilisateurId));
    }

    @Get(':id')
    lireConversationParId(@Param('id') id: string) {
        return this.service.lireConversationParId(Number(id));
    }

    @Delete(':id')
    supprimerConversation(@Param('id') id: string) {
        return this.service.supprimerConversation(Number(id));
    }

}
