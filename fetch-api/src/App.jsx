import { useEffect, useState } from 'react'
// import './App.css'

function App() {
  const [card, setCard] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function loadJokes() {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes");
        const data = await response.json();
        setCard(data.data.data)
        setTotal(data.data.totalItems)
        console.log("FINAL ARRAY:", data);
      } catch (error) {
        console.log(":::::err", error);
      }
    }

    loadJokes();

    return () => {}
  },[])

  return (
    <>
      <h1>Fetch API</h1>
      <h1>Total Items: {total}</h1>
      {card.map((item) => (
        <div>
        <h2>{item.id}</h2>
        <h2>{item.categories.length > 0 ? item.categories : "No categories"}</h2>
        <p key={item.id}>{item.content}</p>
        </div>
      ))}
    </>
  )
}

export default App
