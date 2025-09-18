import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Conversation, Prisma} from "@prisma/client";

@Injectable()
export class ConversationService {
    constructor(private prisma:PrismaService) {}

    async creerConversation(participantsIds: number[], nom?: string): Promise<Conversation> {
        return this.prisma.conversation.create({
            data: {
                nom,
                participants: {
                    connect: participantsIds.map((id) => ({ id })),
                },
            },
            include: { participants: true },
        });
    }

    // Récupérer toutes les conversations d’un utilisateur
    async lireConversationsUtilisateur(utilisateurId: number): Promise<Conversation[]> {
        return this.prisma.conversation.findMany({
            where: {
                participants: {
                    some: { id: utilisateurId },
                },
            },
            include: {
                participants: true,
                messages: {
                    take: 1, // optionnel : récupère uniquement le dernier message pour l’aperçu
                    orderBy: { dateEnvoi: "desc" },
                    include: { utilisateur: true },
                },
            },
        });
    }

    // Lire une conversation précise (avec ses messages)
    async lireConversationParId(id: number): Promise<Conversation> {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id },
            include: {
                participants: true,
                messages: { include: { utilisateur: true } },
            },
        });
        if (!conversation) throw new NotFoundException(`Conversation ${id} introuvable`);
        return conversation;
    }


    async supprimerConversation(id: number){
        return this.prisma.conversation.delete({where:{id}})
    }
}
