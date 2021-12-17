import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import TodoProvider from './contexts/Todo/provider';

ReactDOM.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
