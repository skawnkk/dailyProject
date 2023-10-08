import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dbConfig } from './models/db';
import dailyRouter from './routes/daily.route';
import todoRouter from './routes/todo.route';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger/config';
const app = express();
export const connection = mysql.createConnection(dbConfig);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/', (req, res) => {
  res.json({ message: 'Hello World2!' });
});

app.use('/schedule', dailyRouter);
app.use('/todo', todoRouter);

const port = 8080;
app.listen(port, () => {
  console.log('HELLO !');
});
