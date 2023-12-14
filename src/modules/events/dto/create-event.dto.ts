export interface CreateEventDtoInput {
  name: string;
  start_date: Date | string;
  start_date_registration: Date | string;
  end_date_registration: Date | string;
  additional_information: string;
  start_place: string;
  participants_limit: number;
  event_creator: string
}

export interface CreateEventDtoOutput {
  id: string;
  name: string;
  start_date: string;
  start_date_registration: string;
  end_date_registration: string;
  additional_information: string;
  start_place: string;
  participants_limit: number;
}
