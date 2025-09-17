import {Controller, Post, Body, Get, Param, Put, Delete} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';

@Controller('utilisateurs')
export class UtilisateurController {
    constructor(private readonly service: UtilisateurService) {}

    @Post()
    creerUser(@Body() body: { pseudo: string; email: string; clerkId: string }) {
        return this.service.creerUser(body);
    }

    @Get()
    lireUsers() {
        return this.service.lireUsers();
    }

    @Get('faker')
    genererFauxUtilisateurs() {
        return this.service.genererFauxUtilisateurs();
    }

    // Lecture utilisateur par clerkId (string)
    @Get('clerk/:clerkId')
    lireUserParClerkId(@Param('clerkId') clerkId: string) {
        return this.service.lireUserParClerkId(clerkId);
    }

    // Mise à jour utilisateur par clerkId
    @Put(':clerkId/profil')
    mettreAJourProfil(
        @Param('clerkId') clerkId: string,
        @Body() body: { pseudo?: string; avatar?: string }
    ) {
        return this.service.mettreAJourProfil(clerkId, body);
    }

    @Delete(':clerkId')
    supprimerUser(@Param('clerkId') clerkId: string) {
        return this.service.supprimerUtilisateur(clerkId);
    }
}
