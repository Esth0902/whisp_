import { Injectable } from '@nestjs/common';
import { PrismaService} from "../prisma/prisma.service";
import { Prisma, Message} from "@prisma/client"

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async envoyerMessage(data: Prisma.MessageCreateInput): Promise<Message> {
        return this.prisma.message.create({data: data});
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

    async supprimerConversation(id: number){
        return this.prisma.conversation.delete({where:{id}})
    }
}
