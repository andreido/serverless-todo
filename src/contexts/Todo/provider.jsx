import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import config from '../../config';
import TodoContext from './context';

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(config.TODO_API_URL);
      const todos = response.data;
      todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      todos.sort((a, b) => new Date(a.completed) - new Date(b.completed));
      setTodos(todos);
      return todos;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addTodo = useCallback(
    async (todo) => {
      try {
        const response = await axios.post(config.TODO_API_URL, { todo });
        fetchTodos();
        const newTodo = response.data;
        return newTodo;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchTodos]
  );

  const deleteTodo = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(`${config.TODO_API_URL}${id}`);
        const deletedTodo = response.data;
        fetchTodos();
        return deletedTodo;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchTodos]
  );

  const updateTodo = useCallback(
    async (id, completed) => {
      try {
        const response = await axios.put(`${config.TODO_API_URL}${id}`, { completed });
        const updatedTodo = response.data;
        fetchTodos();
        return updatedTodo;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchTodos]
  );

  const getTodo = useCallback(async (id) => {
    try {
      const response = await axios.get(`${config.TODO_API_URL}${id}`);
      const todo = response.data;
      return todo;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => fetchTodos(), [fetchTodos]);

  const value = useMemo(
    () => ({
      todos,
      addTodo,
      deleteTodo,
      getTodo,
      fetchTodos,
      updateTodo
    }),
    [todos, addTodo, deleteTodo, getTodo, fetchTodos, updateTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
