import { HttpException } from "@nestjs/common"

export function validateDateAndReturnDate(date: string) {
  const regexDateFormat = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/
  const matchReturn = date.match(regexDateFormat)

  if (matchReturn === null) {
    throw new HttpException('Date not valid! Please use dash, bars or points', 400)
  }

  let newDate = {
    year: Number(matchReturn[3]),
    month: Number(matchReturn[2]),
    date: Number(matchReturn[1])
  }

  if (newDate.date > 31 || newDate.month > 12) {
    throw new HttpException('Invalid date', 400)
  }

  return new Date(newDate.year, newDate.month - 1, newDate.date)
}