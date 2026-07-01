export interface DbDetails {
  jdbcUrl: string;
  password: string;
  url: string;
  username: string;
}

export type DbConfigMap = Record<string, DbDetails>;