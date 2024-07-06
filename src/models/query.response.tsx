import { DataBase } from "./dataBase.model";
import { DataSource } from "./dataSource.model";

export interface QueryResponse {
    headers: Array<string>;
    records: Array<Array<object>>;
    time: number;
    dataSource: DataSource;
    dataBase: DataBase;
}