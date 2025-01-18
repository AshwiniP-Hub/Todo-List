import React from "react";
import TodoList from "./components/Todolist";


const App = () => {
  return (
    
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Todo List</h1>
      <TodoList/>
    </div>
  );
};

export default App;
