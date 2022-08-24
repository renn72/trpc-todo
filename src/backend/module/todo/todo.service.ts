import { prisma } from '../../utils/prisma';
import {
  CreateTodoInput,
  DeleteTodoInput,
  GetTodoInput,
  UpdateTodoInput,
} from './todo.schema';

export function createTodo(data: CreateTodoInput) {
  return prisma.todo.create({ data });
}

export function getAllTodos() {
  return prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      body: true,
      completed: true,
    },
  });
}

export function getTodo(data: GetTodoInput) {
  return prisma.todo.findUnique({
    where: { id: data.id },
  });
}

export function updateTodo({ id, ...data }: UpdateTodoInput) {
  return prisma.todo.update({
    where: { id },
    data,
  });
}

export function deleteTodoService(data: DeleteTodoInput) {
  return prisma.todo.delete({
    where: { id: data.id },
  });
}
