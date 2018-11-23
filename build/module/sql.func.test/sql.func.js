export class SqlFunc {
    constructor() {
        this.sql = require('mssql');
        this.config = {
            server: 'ubcmistdata.cuxmnjt45mtv.us-west-1.rds.amazonaws.com',
            port: 1433,
            user: 'ubcmist',
            password: 'mistmist',
            database: ''
        };
        this.connPool = new this.sql.ConnectionPool(this.config);
    }
    getPool() {
        return this.connPool;
    }
    connectionCheck() {
        try {
            this.connPool.connect();
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsLmZ1bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3FsLmZ1bmMudGVzdC9zcWwuZnVuYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sT0FBTztJQU1oQjtRQUpRLFFBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFLM0IsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLE1BQU0sRUFBRSxzREFBc0Q7WUFDOUQsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSTtZQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUFBLE9BQU8sQ0FBQyxFQUFFO1lBQ1AsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0NBQ0oifQ==