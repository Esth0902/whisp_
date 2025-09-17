import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Conversation, Prisma} from "@prisma/client";

@Injectable()
export class ConversationService {
    constructor(private prisma:PrismaService) {}

    async creerConversation(data: Prisma.ConversationCreateInput) : Promise<Conversation> {
        return this.prisma.conversation.create({data, include:{participants:true}});
    }

    async lireConversationParId(id: number): Promise<Conversation> {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id },
            include: { participants: true, messages: { include: { utilisateur: true } } },
        });
        if (!conversation) throw new NotFoundException(`Conversation ${id} introuvable`);
        return conversation;
    }

    async supprimerConversation(id: number){
        return this.prisma.conversation.delete({where:{id}})
    }
}
