import { useState } from "react"

export interface Todo{
  id: string,
  title: string,
  isComplete: boolean
}

function App() {

  const [currentValue, setCurrentValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([])

  function handleClickAddButton () {
    todos.push({ id: `${Date.now()}`, title: currentValue, isComplete: false});
    const newArray = [...todos];
    setTodos(newArray)
    setCurrentValue('');
  }

  function handleRemove(id: string) {
    const result = todos.filter(e => e.id !== id);
    setTodos(result)
  }

  return (
    <div>
        <div>
           <input
            onChange={(e) => setCurrentValue(e.target.value)}
            value={currentValue}
            type="text"
            placeholder='Enter your todo here' />
           <button onClick={handleClickAddButton}>Add</button>
        </div>
       <ul>
        {todos.map(e => (
          <>
            <li key={e.id}>{e.title}</li>
            <button onClick={() => handleRemove(e.id)}>Remove</button>
          </>
          ))}
       </ul>
    </div>
  )
}

export default App
