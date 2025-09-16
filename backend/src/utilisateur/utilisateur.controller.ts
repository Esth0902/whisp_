import { Controller, Post, Body, Get, Param, Put} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';

@Controller('utilisateur')
export class UtilisateurController {
    constructor(private readonly service: UtilisateurService) {}

    @Post()
    creerUser(@Body() body: { nom: string; email: string; clerkId: string }) {
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
    @Put(':clerkId')
    mettreAJourProfil(
        @Param('clerkId') clerkId: string,
        @Body() body: { nom?: string }
    ) {
        return this.service.mettreAJourProfil(clerkId, body);
    }
}
