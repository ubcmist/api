import {ConnectionPool} from "mssql";

export class SqlFunc{

    private sql = require('mssql');
    private config: any;
    private connPool: ConnectionPool;

    // Fill in credentials to run test file
    constructor(){
        this.config = {
            server: '',
            port: 0,
            user: '',
            password: '',
            database: ''
        };
        this.connPool = new this.sql.ConnectionPool(this.config);
    }

    public getPool(){
        return this.connPool;
    }

    public connectionCheck(){
        try {
            this.connPool.connect();
            return true;
        }catch (e) {
            return false;
        }
    }
}