import { Body, Controller, HttpCode, HttpException, Post, UseGuards, Headers } from '@nestjs/common';

import { LocalAuthGuard } from '../../../modules/auth/guards/local-auth.guards';
import { CreateEventDtoInput } from '../dto/create-event.dto';
import { EventsService } from '../service/events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @HttpCode(201)
  async createEventsHandler(@Headers('authorization') event_creator: string, @Body() createEventDtoInput: CreateEventDtoInput) {
    try {
      return this.eventsService.createEvent(event_creator, createEventDtoInput)
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }
}
