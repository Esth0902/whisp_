import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Utilisateur } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class UtilisateurService {
    constructor(private prisma: PrismaService) {}

    async creerUser(data: { nom: string; email: string; clerkId: string }): Promise<Utilisateur> {
        return this.prisma.utilisateur.create({
            data: {
                nom: data.nom,
                email: data.email,
                clerkId: data.clerkId,
            },
        });
    }

    async lireUsers(): Promise<Utilisateur[]> {
        return this.prisma.utilisateur.findMany();
    }

    async lireUserParClerkId(clerkId: string): Promise<Utilisateur | null> {
        return this.prisma.utilisateur.findUnique({
            where: { clerkId },
        });
    }

    async genererFauxUtilisateurs(): Promise<Utilisateur[]> {
        const utilisateurs: Utilisateur[] = [];

        for (let i = 0; i < 5; i++) {
            try {
                const user = await this.prisma.utilisateur.create({
                    data: {
                        nom: faker.person.fullName(),
                        email: faker.internet.email(),
                        clerkId: faker.string.uuid(),
                    },
                });
                utilisateurs.push(user);
            } catch (error) {
                console.error(`Erreur création utilisateur ${i + 1}:`, error);
            }
        }

        return utilisateurs;
    }

    async mettreAJourProfil(clerkId: string, data: { nom?: string }): Promise<Utilisateur> {
        return this.prisma.utilisateur.update({
            where: { clerkId },
            data,
        });
    }
}
