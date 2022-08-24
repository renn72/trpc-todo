import * as trpc from '@trpc/server';
import { z } from 'zod';
import {
  createTodoInputSchema,
  deleteTodoInputSchema,
  getTodoInputSchema,
  updateTodoInputSchema,
} from './todo.schema';
import {
  createTodo,
  deleteTodoService,
  getAllTodos,
  getTodo,
  updateTodo,
} from './todo.service';

export const todoRouter = trpc
  .router()
  .query('find-todo', {
    input: getTodoInputSchema,
    async resolve({ input }) {
      const todo = await getTodo(input);
      return todo;
    },
  })
  .query('todos', {
    async resolve() {
      const todos = await getAllTodos();
      return todos;
    },
  })
  .mutation('create-todo', {
    input: createTodoInputSchema,
    async resolve({ input }) {
      const todo = await createTodo(input);
      return todo;
    },
  })
  .mutation('update-todo', {
    input: updateTodoInputSchema,
    async resolve({ input }) {
      const todo = await updateTodo(input);
      return todo;
    },
  })
  .mutation('delete-todo', {
    input: deleteTodoInputSchema,
    async resolve({ input }) {
      const todo = await deleteTodoService(input);
      return todo;
    },
  });
