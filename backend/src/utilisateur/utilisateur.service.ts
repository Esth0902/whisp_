import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Utilisateur } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UtilisateurService {

    constructor(private prisma: PrismaService){};

    async creerUser(
        data: {
            nom: string;
            email: string;
            motDePasse: string;
        }
    ): Promise<Utilisateur> {

        const motDePasseHashe = await bcrypt.hash(data.motDePasse, 10); // 10 = niveau de sécurité
        return this.prisma.utilisateur.create({
            data: {
                nom: data.nom,
                email: data.email,
                motDePasse: motDePasseHashe,
            },
        });

    }

    async lireUsers(): Promise<Utilisateur[]> {
        return this.prisma.utilisateur.findMany();
    }

    async lireUser(id: number): Promise<Utilisateur| null>  {
        return this.prisma.utilisateur.findUnique({ where: { id: id } })} ;


    async genererFauxUtilisateurs(): Promise<Utilisateur[]> {
        const utilisateurs: Utilisateur[] = [];

        for (let i = 0; i < 5; i++) {
            try {
                const motDePasseClair = faker.internet.password();
                console.log(`Mot de passe clair ${i + 1}:`, motDePasseClair);

                const motDePasseHashe = await bcrypt.hash(motDePasseClair, 10);
                console.log(`Mot de passe haché ${i + 1}:`, motDePasseHashe);

                const user = await this.prisma.utilisateur.create({
                    data: {
                        nom: faker.person.fullName(),
                        email: faker.internet.email(),
                        motDePasse: motDePasseHashe,
                    },
                });

                console.log(`Utilisateur ${i + 1} créé :`, user);
                utilisateurs.push(user);
            } catch (error) {
                console.error(`Erreur lors de la création de l'utilisateur ${i + 1}:`, error);
            }
        }

        return utilisateurs;
    }}

