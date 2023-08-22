import { hashSync } from 'bcryptjs'

export async function hashPassword(password: string) {
  return hashSync(password, 10)
}