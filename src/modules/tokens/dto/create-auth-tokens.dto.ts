export interface CreateAuthTokensDtoInput {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresDate: Date;
}

export interface CreateAuthTokensDtoOutput {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};