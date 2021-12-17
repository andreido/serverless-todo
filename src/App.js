import React, { useState } from 'react';
import TodoItem from './components/TodoItem';

import useTodo from './contexts/Todo/useTodo';

import './App.css';

const App = () => {
  const { todos, addTodo } = useTodo();
  const [newTodo, setNewTodo] = useState('');

  const onAddTodo = async (e) => {
    e.preventDefault();
    setNewTodo('');
    addTodo(newTodo);
  };

  return (
    <div className="todos-container">
      <form onSubmit={onAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What's your next task?"
        />
      </form>
      {todos.map((todoProps) => (
        <TodoItem key={todoProps.id} {...todoProps} />
      ))}
    </div>
  );
};

export default App;
