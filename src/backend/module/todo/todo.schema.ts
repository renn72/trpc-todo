import { z } from 'zod';

export const createTodoInputSchema = z.object({
  body: z.string().min(1).max(1000),
});
export type CreateTodoInput = z.infer<typeof createTodoInputSchema>;

export const getTodoInputSchema = z.object({
  id: z.string().cuid(),
});
export type GetTodoInput = z.infer<typeof getTodoInputSchema>;

export const updateTodoInputSchema = z.object({
  id: z.string().cuid(),
  body: z.string().min(1).max(1000),
  completed: z.boolean(),
});
export type UpdateTodoInput = z.infer<typeof updateTodoInputSchema>;

export const deleteTodoInputSchema = z.object({
  id: z.string().cuid(),
});
export type DeleteTodoInput = z.infer<typeof deleteTodoInputSchema>;
