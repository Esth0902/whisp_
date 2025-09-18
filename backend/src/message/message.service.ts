import { Injectable } from '@nestjs/common';
import { PrismaService} from "../prisma/prisma.service";
import { Prisma, Message} from "@prisma/client"

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async envoyerMessage(
        utilisateurId: number,
        conversationId: number,
        contenu: string,
    ) {
        return this.prisma.message.create({
            data: {
                contenu,
                utilisateur: { connect: { id: utilisateurId } },
                conversation: { connect: { id: conversationId } },
            },
        });
    }

    async lireMessagesConversation(conversationId: number): Promise<Message[]> {
        return this.prisma.message.findMany(
            {
                where: {conversationId},
                include: {utilisateur:true},
                orderBy: {dateEnvoi:"asc"}

            }
        )
    }
}
