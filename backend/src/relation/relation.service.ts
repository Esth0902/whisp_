import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Relation } from '@prisma/client';

@Injectable()
export class RelationService {
    constructor(private prisma: PrismaService) {}

    async envoyerRelation(demandeurId: number, receveurId: number): Promise<Relation> {
        return this.prisma.relation.create({
            data: {
                demandeurId,
                receveurId,
            },
        });
    }

    async lireRelationsUtilisateur(utilisateurId: number) {
        return this.prisma.relation.findMany({
            where: {
                statut: 'acceptee',
                OR: [
                    { demandeurId: utilisateurId },
                    { receveurId: utilisateurId },
                ],
            },
            include: { demandeur: true, receveur: true },
        });
    }

    async mettreAJourStatut(id: number, statut: Prisma.RelationUpdateInput['statut']): Promise<Relation> {
        return await this.prisma.relation.update({
            where: { id },
            data: { statut },
            })
    }

    async supprimerRelation(id: number): Promise<Relation> {
            return await this.prisma.relation.delete({ where: { id } });
        }

}

