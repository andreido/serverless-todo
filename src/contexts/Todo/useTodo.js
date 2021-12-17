import { useContext } from 'react';
import TodoContext from './context';

const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('Todo context must be consumed inside the Todo Provider');
  }

  return context;
};

export default useTodo;
