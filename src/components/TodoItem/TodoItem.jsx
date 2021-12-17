import React, { useEffect, useState } from 'react';
import useTodo from '../../contexts/Todo/useTodo';
import { Delete, Edit } from '../../assets/icons';

import './TodoItem.css';

const TodoItem = ({ id, todo, completed, createdAt }) => {
  const { updateTodo, deleteTodo } = useTodo();
  const [isCompleted, setIsCompleted] = useState(completed);

  useEffect(() => setIsCompleted(completed), [completed]);

  const onDelete = (e) => {
    e.stopPropagation();
    deleteTodo(id);
  };

  const onEdit = (e) => {
    e.stopPropagation();
    console.log(`Editing ${id}`);
  };

  const onTodoClick = () => {
    updateTodo(id, !isCompleted);
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="todo-container">
      <button
        type="button"
        onClick={onTodoClick}
        className={`todo ${isCompleted ? 'completed' : ''}`}
      >
        <p className="todo-text">{todo}</p>
      </button>
      <div className="action-btn-container">
        {!isCompleted && (
          <button type="button" onClick={onEdit} className="action-btn">
            <Edit />
          </button>
        )}
        <button type="button" onClick={onDelete} className="action-btn">
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
