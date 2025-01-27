import React, { useState, useEffect } from "react";
import axios from "../axios";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("/")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = () => {
    if (newTodo) {
      axios
        .post("/", { text: newTodo })
        .then((res) => {
          setTodos([...todos, res.data]);
          setNewTodo("");
        })
        .catch((err) => console.error(err));
    }
  };

  const toggleComplete = (id, completed) => {
    axios
      .put(`/${id}`, { completed })
      .then((res) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: res.data.completed } : todo
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-lg mx-auto px-8">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
        className="w-full p-2 border rounded mt-4"
      />
      <button
        onClick={addTodo}
        className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
      >
        Add Todo
      </button>
      <div className="mt-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
