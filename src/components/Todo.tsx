import { inferAsyncReturnType } from '@trpc/server';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import trpc from '../utils/trpc';

// TODO remove any type
function Todo({ todo }: { todo: any }) {
  const queryClient = trpc.useContext();

  const [editing, setEditing] = useState<boolean>(false);
  const [body, setBody] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  useEffect(() => {
    if (todo.body) {
      setBody(todo.body);
    }
  }, [todo.body]);

  const updateTodoMutation = trpc.useMutation(['update-todo'], {
    onMutate: async (newTodo) => {
      await queryClient.cancelQuery(['todos']);
      const previousTodos = queryClient.getQueryData(['todos']);
      if (!previousTodos) return;
      queryClient.setQueryData(
        ['todos'],
        previousTodos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
      );
      return { previousTodos };
    },
    onError: async (_err, _updatedTodo, context) => {
      queryClient.fetchQuery(['todos']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
  function toggleTodoCompleted() {
    updateTodoMutation.mutate({
      id: todo.id,
      body,
      completed: !todo.completed,
    });
    setCompleted((c) => !c);
  }
  function changeTodoBody() {
    updateTodoMutation.mutate({
      id: todo.id,
      body,
      completed,
    });
    setEditing(false);
  }

  const deleteTodoMutation = trpc.useMutation(['delete-todo'], {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  function handleDeleteTodo() {
    deleteTodoMutation.mutate({
      id: todo.id,
    });
  }

  return (
    <div className='flex gap-2 items-center'>
      <input
        className='w-6 h-6'
        type='checkbox'
        checked={completed}
        onChange={toggleTodoCompleted}
      />
      <div style={{ minWidth: '200px' }}>
        {editing ? (
          <input
            className='border border-black'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        ) : (
          <Link href={`/todo/${todo.id}`}>
            <a>{body}</a>
          </Link>
        )}
      </div>

      {editing ? (
        <button
          className='border border-black p-2 w-16'
          onClick={changeTodoBody}
        >
          save
        </button>
      ) : (
        <button
          className='border border-black p-2 w-16'
          onClick={() => setEditing(true)}
        >
          edit
        </button>
      )}
      <button
        className='border border-black p-2 w-16'
        onClick={handleDeleteTodo}
      >
        delete
      </button>
    </div>
  );
}

export default Todo;
