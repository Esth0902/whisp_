import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { RelationService } from './relation.service';
import { Prisma } from '@prisma/client';

@Controller('relation')
export class RelationController {
    constructor(private readonly service: RelationService) {}

    @Post()
    envoyerRelation(@Body() body: { demandeurId: number; receveurId: number }) {
        return this.service.envoyerRelation(body.demandeurId, body.receveurId);
    }

    @Get('utilisateur/:id')
    lireRelationsUtilisateur(@Param('id') id: string) {
        return this.service.lireRelationsUtilisateur(Number(id));
    }

    @Put(':id/statut')
    mettreAJourStatut(
        @Param('id') id: string,
        @Body() body: { statut: Prisma.RelationUpdateInput['statut'] }
    ) {
        return this.service.mettreAJourStatut(Number(id), body.statut);
    }

    @Delete(':id')
    supprimerRelation(@Param('id') id: string) {
        return this.service.supprimerRelation(Number(id));
    }
}
