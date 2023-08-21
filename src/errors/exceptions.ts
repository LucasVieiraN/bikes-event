export class ErrorException extends Error {
  message: string;
  statusCode: number
  name: string

  constructor(message: string, statusCode?: number, name?: string) {
    super(message)

    this.statusCode = statusCode || 500
    this.name = name || 'INTERNAL SERVER ERROR'
  }
}