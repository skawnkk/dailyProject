import * as todoService from '../services/todo.service';

export const getTodo = async (req, res, next) => {
  const dailyId = req.params.id;
  todoService.getTodo(dailyId, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};

export const createTodo = async (req, res, next) => {
  const { todo } = req.body;
  todoService.createTodo(req.params.id, todo, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};

export const updateTodo = async (req, res, next) => {
  const { todoId, value } = req.body;
  todoService.updateTodo(req.params.id, todoId, value, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};

export const deleteTodo = async (req, res, next) => {
  todoService.deleteTodo(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};
