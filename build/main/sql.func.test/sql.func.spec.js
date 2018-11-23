"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const sql_func_1 = require("./sql.func");
let sqlFunc;
const test = ava_1.default;
test.before("Init", () => {
    sqlFunc = new sql_func_1.SqlFunc();
});
test('Test valid connection', (t) => {
    t.is(true, sqlFunc.connectionCheck());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsLmZ1bmMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zcWwuZnVuYy50ZXN0L3NxbC5mdW5jLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBMkM7QUFDM0MseUNBQW1DO0FBRW5DLElBQUksT0FBZ0IsQ0FBQztBQUVyQixNQUFNLElBQUksR0FBRyxhQUFpQyxDQUFDO0FBRS9DLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNyQixPQUFPLEdBQUcsSUFBSSxrQkFBTyxFQUFFLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNoQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUMsQ0FBQSJ9