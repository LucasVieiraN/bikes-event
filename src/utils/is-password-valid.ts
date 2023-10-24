import { HttpException } from "@nestjs/common";

export function isPasswordValid(password: string) {
  const regexForOneNumberOneUpperCaseAndSixCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
  const validRegex = password.match(regexForOneNumberOneUpperCaseAndSixCharacters)

  if (validRegex === null) {
    throw new HttpException('Password must contain 1 number, 1 uppercase and at least 6 characters', 400)
  }

  return true;
}