import { User } from "../../../modules/users/entities/user.entity"

export class Event {
  id: string

  name: string

  start_date: Date

  start_date_registration: Date

  end_date_registration: Date

  additional_information: string

  start_place: string

  participants_limit: Number

  users: User[]
}