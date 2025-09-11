import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';

@Controller('utilisateur')
export class UtilisateurController {

    constructor(private readonly service: UtilisateurService) {}

    // Route POST /utilisateurs → créer un utilisateur
    @Post()
    creerUser(@Body() body: { nom: string; email: string; motDePasse: string }) {
        return this.service.creerUser(body);
    }

    // Route GET /utilisateurs → lire tous les utilisateurs
    @Get()
    lireUsers() {
        return this.service.lireUsers();
    }

    @Get('faker')
    genererFauxUtilisateurs() {
        return this.service.genererFauxUtilisateurs();
    }

    // Route GET /utilisateurs/:id → lire un utilisateur par ID
    @Get(':id')
    lireUser(@Param('id') id: string) {
        return this.service.lireUser(Number(id));
    }
}
