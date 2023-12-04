import { sign } from 'jsonwebtoken';

interface CreateJwtOutput {
  accessToken: string
  refreshToken: string
}

export function createJwt(userId: string): CreateJwtOutput {
  const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
  const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN })

  return { accessToken, refreshToken }
}