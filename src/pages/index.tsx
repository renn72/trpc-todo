import type { NextPage } from 'next';
import CreateTodo from '../components/CreateTodo';
import Todo from '../components/Todo';
import trpc from '../utils/trpc';

const Home: NextPage = () => {
  const todos = trpc.useQuery(['todos']);

  return (
    <div className='flex flex-col gap-2 p-2'>
      <h1 className='text-2xl'>TodoMVC (Next.js / tRPC)</h1>
      <CreateTodo />
      {todos.data ? (
        todos.data.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Home;
