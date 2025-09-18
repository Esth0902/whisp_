import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import { RelationController } from './relation.controller';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  providers: [RelationService, PrismaService],
  controllers: [RelationController]
})
export class RelationModule {}
