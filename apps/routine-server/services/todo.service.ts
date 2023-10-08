import { connection } from '../index';
import createError from 'http-errors';

export const getTodo = (dailyId: string, cb: any) => {
  connection.query(`SELECT todoId, done, todo FROM todo where todo.dailyId=${dailyId}`, (error, rows, fields) => {
    if (error) cb(createError(500, error));
    else {
      cb(null, rows);
    }
  });
};
export const createTodo = (dailyId: string, todo: string, cb: any) => {
  connection.query(`INSERT INTO todo(dailyId, todo, done) VALUES('${dailyId}', '${todo}', 'N')`, (error, rows, fields) => {
    if (error) cb(createError(500, error));
    else {
      cb(null, { message: 'success' });
    }
  });
};

export const updateTodo = (dailyId: string, todoId: string, value: string, cb: any) => {
  connection.query(
    `UPDATE todo
    SET done = '${value}'
    WHERE todo.dailyId=${dailyId} and todo.todoId=${todoId}`,
    (error, rows, fields) => {
      if (error) cb(createError(500, error));
      else {
        cb(null, { id: todoId, done: value });
      }
    }
  );
};

export const deleteTodo = (todoId: string, cb: any) => {
  connection.query(
    `DELETE FROM todo
    WHERE todo.todoId=${todoId}`,
    (error, rows, fields) => {
      if (error) cb(createError(500, error));
      else {
        cb(null, { message: 'SUCCESS' });
      }
    }
  );
};
