import { addDays } from 'date-fns'

export function tokenExpirationDate(date: string): Date {
  const expiresDate = addDays(
    new Date().getTime(),
    Number(date.replace("d", "")),
  );

  return expiresDate
}