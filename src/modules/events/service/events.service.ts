import { HttpException, Injectable } from '@nestjs/common';

import { format, isPast, sub } from 'date-fns';
import { decode } from 'jsonwebtoken'


import { CreateEventDtoInput, CreateEventDtoOutput } from '../dto/create-event.dto';
import { EventsRepository } from '../repository/events.repository';
import { validateDateAndReturnDate } from '../../../utils/validate-date-and-return-date';



@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async createEvent(event_creator: string, {
    additional_information,
    end_date_registration,
    name,
    participants_limit,
    start_date,
    start_date_registration,
    start_place
  }: CreateEventDtoInput): Promise<CreateEventDtoOutput> {
    interface UserIdFromJWT {
      userId: string
    }

    const tokenSplited = event_creator.split('Bearer ')[1]
    const { userId } = decode(tokenSplited) as UserIdFromJWT
    const dateFormated = {
      start_date: validateDateAndReturnDate(String(start_date)),
      start_date_registration: validateDateAndReturnDate(String(start_date_registration)),
      end_date_registration: validateDateAndReturnDate(String(end_date_registration))
    }
    const isDateFormatedInPast = {
      start_date: isPast(dateFormated.start_date),
      start_date_registration: isPast(dateFormated.start_date_registration),
      end_date_registration: isPast(dateFormated.end_date_registration)
    }
    const oneMonthBeforeTheRegistrationDate = sub(dateFormated.start_date, { months: 1 })

    if (isDateFormatedInPast.start_date || isDateFormatedInPast.start_date_registration || isDateFormatedInPast.end_date_registration) {
      throw new HttpException('Invalid Date.', 400)
    }

    if (dateFormated.start_date_registration < oneMonthBeforeTheRegistrationDate) {
      throw new HttpException(`The registration start date can be between the day: ${format(oneMonthBeforeTheRegistrationDate, 'dd/MM/yyyy')
        } and ${format(dateFormated.start_date, 'dd/MM/yyyy')
        }`, 400)
    }

    if (dateFormated.start_date_registration > dateFormated.end_date_registration) {
      throw new HttpException('The registration start date cannot be after the end of registration!', 400)
    }

    const createdEvent = await this.eventsRepository.create({
      additional_information,
      name,
      start_place,
      participants_limit,
      start_date: dateFormated.start_date,
      start_date_registration: dateFormated.start_date_registration,
      end_date_registration: dateFormated.end_date_registration,
      event_creator: userId
    })

    return {
      ...createdEvent,
      start_date: format(dateFormated.start_date, 'dd/MM/yyyy'),
      start_date_registration: format(dateFormated.start_date_registration, 'dd/MM/yyyy'),
      end_date_registration: format(dateFormated.end_date_registration, 'dd/MM/yyyy')
    }
  }
}