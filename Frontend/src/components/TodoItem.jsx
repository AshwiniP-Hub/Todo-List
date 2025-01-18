import React from 'react'

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <>
     <div className="flex justify-between items-center py-2 px-4 border-b">
      <div
        onClick={() => toggleComplete(todo._id, !todo.completed)}
        className={`cursor-pointer ${todo.completed ? "line-through" : ""}`}
      >
        {todo.text}
      </div>
      <button
        onClick={() => deleteTodo(todo._id)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
    </>
  )
}

export default TodoItem