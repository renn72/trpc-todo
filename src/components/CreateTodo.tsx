import { useState } from 'react';
import trpc from '../utils/trpc';

function CreateTodo() {
  const [body, setBody] = useState<string>('');
  const queryClient = trpc.useContext();

  const createTodoMutation = trpc.useMutation(['create-todo'], {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  function handleCreateTodo() {
    createTodoMutation.mutate({ body });
    setBody('');
  }

  return (
    <div className='flex gap-2'>
      <input
        className='border border-black p-2'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button className='border border-black p-2' onClick={handleCreateTodo}>
        Create
      </button>
    </div>
  );
}

export default CreateTodo;
