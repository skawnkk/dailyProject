import express from 'express';
import * as todoController from '../controllers/todo.controller';
const todoRouter = express.Router();
//todo 클라이언트에서 바꾸기
todoRouter.get('/:id', todoController.getTodo);
todoRouter.put('/:id', todoController.updateTodo);
todoRouter.post('/:id', todoController.createTodo);
todoRouter.delete('/:id', todoController.deleteTodo);
export default todoRouter;
