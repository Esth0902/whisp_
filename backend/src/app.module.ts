import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { MessageModule } from './message/message.module';
import { AuthModule} from "./auth/auth.module";
import { ConversationModule } from './conversation/conversation.module';
import { RelationModule } from './relation/relation.module';

@Module({
  imports: [UtilisateurModule, MessageModule, AuthModule, ConversationModule, RelationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
