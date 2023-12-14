import { Module } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { EventsService } from '../service/events.service';
import { EventsController } from '../controller/events.controller';
import { EventsRepository } from '../repository/events.repository';

@Module({
  controllers: [EventsController],
  providers: [PrismaService, EventsService, EventsRepository],
})
export class EventsModule {}
