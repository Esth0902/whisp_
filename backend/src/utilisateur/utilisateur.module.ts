import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UtilisateurService,PrismaService],
  controllers: [UtilisateurController]
})
export class UtilisateurModule {}
