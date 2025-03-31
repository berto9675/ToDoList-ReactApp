import { useState, useCallback } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import './index.css'; 

function App() {
  const [todos, setTodos] = useState([]);

  const handleAdd = useCallback((text) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text }]);
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const handleMove = useCallback((index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === todos.length - 1)
    ) return;

    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      [newTodos[index], newTodos[index + direction]] = 
      [newTodos[index + direction], newTodos[index]];
      return newTodos;
    });
  }, [todos.length]); 

  return (
    <div className="app">
      <h1>ToDo List</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onMove={handleMove} />
    </div>
  );
}

export default App;
