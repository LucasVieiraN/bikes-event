import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../database/prisma.service";
import { CreateEventDtoInput } from "../dto/create-event.dto";

@Injectable()
export class EventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDtoInput: CreateEventDtoInput) {
    return this.prisma.events.create({
      data: createEventDtoInput,
      select: {
        id: true,
        name: true,
        start_place: true,
        additional_information: true,
        participants_limit: true,
        start_date: true,
        start_date_registration: true,
        end_date_registration: true
      }
    })
  }
}