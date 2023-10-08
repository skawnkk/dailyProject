import { MysqlError } from 'mysql';
import { connection } from '../index';
import createError from 'http-errors';

interface DailyWithTodosAndSchedule {
  date: Date;
  keep: string;
  problem: string;
  try: string[];
  todos: { todoId: number; todo: string; done: boolean }[];
  schedule: { timeId: number; time: string; task: string }[];
}

export const getDailyList = ({ year, month }, cb: any) => {
  connection.query(
    `SELECT *
  FROM daily
  WHERE date LIKE '${year}-${month >= 10 ? month : `0${month}`}%';
  `,
    (error, rows, fields) => {
      if (error) cb(createError(500, error));
      else {
        // const { dailyId, date, keep, problem, try: tryData } = rows[0];
        // const todoIds = new Set();
        // const todos = rows
        //   .filter((row) => row.todoId !== null)
        //   .map((row) => {
        //     if (todoIds.has(row.todoId)) {
        //       return null;
        //     }
        //     todoIds.add(row.todoId);
        //     return { todoId: row.todoId, todo: row.todo, done: row.done };
        //   })
        //   .filter((row) => row !== null);

        cb(null, rows);
      }
    }
  );
};

// API분리하기
export const createDaily = (date: string, cb: any) => {
  connection.query(`SELECT dailyId FROM daily WHERE date = '${date}' and memberId = '1'`, (error, rows, fields) => {
    if (error) {
      console.error('Error fetching createDaily:', error);
      cb(createError(500, error));
    } else {
      if (rows.length > 0) {
        cb(null, { id: rows[0]?.dailyId });
      } else {
        connection.query(`INSERT INTO daily (date, memberId) VALUES ('${date}', '1')`, (err, rows) => {
          if (err) {
            cb(createError(500, err));
            console.error('Error createDaily:', err);
          } else {
            cb(null, { id: rows.insertId });
          }
        });
      }
    }
  });
};

export const updateDaily = (data: { dailyId: string; id: string; value: string }, cb: any) => {
  connection.query(`UPDATE daily SET ${data.id} = '${data.value}' WHERE daily.dailyId = ${data.dailyId}`, (error, rows, fields) => {
    if (error) {
      console.error('Error fetching createDaily:', error);
      cb(createError(500, error));
    } else {
      cb(null, { message: 'success' });
    }
  });
};

export const findDaily = (dailyId: string, cb: any) => {
  connection.query(
    `SELECT *
    FROM daily
    LEFT JOIN todo ON daily.dailyId = todo.dailyId
    LEFT JOIN _timeTable ON daily.dailyId = _timeTable.dailyId
    WHERE daily.dailyId = ${dailyId};`,
    (error: MysqlError | null, rows: any[], fields) => {
      if (error) cb(createError(500, error));
      else {
        try {
          if (!rows.length) cb(null, null);
          const { date, keep, problem, try: tryData } = rows[0];
          const todoIds = new Set();
          const todos = rows
            .filter((row) => row.todoId !== null)
            .map((row) => {
              if (todoIds.has(row.todoId)) {
                return null;
              }
              todoIds.add(row.todoId);
              return { todoId: row.todoId, todo: row.todo, done: row.done };
            })
            .filter((row) => row !== null);
          const schedule = rows.filter((row) => row.time !== null).map((row) => ({ time: row.time, task: row.task }));
          cb(null, { date, keep, problem, try: tryData, todos, schedule });
        } catch (e) {
          console.error(e);
        }
      }
    }
  );
};

export const updateSchedule = (dailyId: string, time: string, schedule: string, cb: any) => {
  connection.query(
    `INSERT INTO _timeTable (dailyId, time, task)
    VALUES ('${dailyId}', '${time}', '${schedule}')
    ON DUPLICATE KEY UPDATE task='${schedule}'`,
    (error, rows, fields) => {
      console.log(error);
      if (error) cb(createError(500, error));
      else {
        cb(null, { time, schedule });
      }
    }
  );
};

//working
export const createSchedule = (date: string, time: string, schedule: string, cb: any) => {
  console.log(date, time, schedule);
  connection.query(`INSERT INTO _timeTable (time, task) VALUES ('${time}', '${schedule}')`, (err, rows) => {
    if (err) {
      console.error('Error adding data to _timeTable:', err);
      rows.status(500).json({ error: 'Error adding data to _timeTable' });
    } else {
      console.log(rows);

      rows.status(200).json({ message: 'Data added successfully', id: rows[0].id });
    }
  });
};
