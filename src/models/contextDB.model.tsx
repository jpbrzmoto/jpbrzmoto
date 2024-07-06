import { DataBase } from "./dataBase.model";
import { DataSource } from "./dataSource.model";
import { QueryResponse } from "./query.response";

export interface ContextDB {
    sql: string;
    dataSources: DataSource[];
    dataBases: DataBase[];
    results: QueryResponse[];
}