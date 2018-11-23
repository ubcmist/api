import { ConnectionPool } from "mssql";
export declare class SqlFunc {
    private sql;
    private config;
    private connPool;
    constructor();
    getPool(): ConnectionPool;
    connectionCheck(): boolean;
}
