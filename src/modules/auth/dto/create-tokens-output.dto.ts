interface CreateTokensDtoOutput {
  expiresDate: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}