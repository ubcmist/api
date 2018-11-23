import anyTest, {TestInterface} from 'ava';
import {SqlFunc} from "./sql.func";

let sqlFunc: SqlFunc;

const test = anyTest as TestInterface<{x:any}>;

test.before("Init", () => {
    sqlFunc = new SqlFunc();
});

test('Test valid connection', (t) => {
    t.is(true, sqlFunc.connectionCheck())
})