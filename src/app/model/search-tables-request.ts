export interface SearchTablesRequest {
    databaseName: string | null;
    owner: string | undefined;
    tableName: string | undefined;
    tipologia: string | null;
}