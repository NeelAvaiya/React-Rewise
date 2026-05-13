import { useState } from "react"
import "./App.css"

export interface Todo {
  id: string
  title: string
  isComplete: boolean
}

function App() {
  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return

    const newTodo: Todo = {
      id: `${Date.now()}`,
      title: inputValue,
      isComplete: false,
    }

    setTodos([...todos, newTodo])
    setInputValue("")
  }

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    )
  }

  const handleRemoveTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo()
    }
  }

  const completedCount = todos.filter((t) => t.isComplete).length

  return (
    <div className="app-container">
      <div className="app-card">
        <header className="app-header">
          <h1>My Tasks</h1>
          <p className="task-count">
            {completedCount} of {todos.length} completed
          </p>
        </header>

        <div className="input-section">
          <input
            type="text"
            className="todo-input"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="add-button" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add one to get started! 🚀</p>
          </div>
        ) : (
          <ul className="todos-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.isComplete}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span className={`todo-text ${todo.isComplete ? "completed" : ""}`}>
                  {todo.title}
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleRemoveTodo(todo.id)}
                  title="Delete task"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
