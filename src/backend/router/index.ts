import * as trpc from '@trpc/server';
import { todoRouter } from '../module/todo/todo.router';

export const appRouter = trpc.router().merge(todoRouter);

// export type definitions of API
export type AppRouter = typeof appRouter;
