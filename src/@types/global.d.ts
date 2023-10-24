namespace NodeJS {
  interface ProcessEnv {
    PORT: string | undefined;
    DATABASE_URL: string | undefined
    REFRESH_TOKEN_SECRET: string | undefined
    REFRESH_TOKEN_EXPIRES_IN: string | undefined
    ACCESS_TOKEN_SECRET: string | undefined
    ACCESS_TOKEN_EXPIRES_IN: string | undefined
  }
}
