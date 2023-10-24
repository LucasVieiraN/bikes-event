import { User } from "../../../modules/users/entities/user.entity"

export class Token {
  id: string

  accessToken: string

  refreshToken: string

  userId: string

  expiresAt: Date

  createdAt: Date

  Users: User
}
