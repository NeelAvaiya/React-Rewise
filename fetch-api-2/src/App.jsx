import { useState } from 'react'
import './App.css'

function App() {
  const [menu, setMenu] = useState([])
  const [show, setShow] = useState(false)

  const handleLoadMenu = async () => {
  try {
    const response = await fetch("https://api.freeapi.app/api/v1/public/meals");
    const data = await response.json();

    setMenu(data.data.data);
    setShow(!show)
    console.log(":::::", data);
  } catch (error) {
    console.log("ERROR:", error);
  }
};

  return (
    <>
    <h1>Hello</h1>
    <button onClick={handleLoadMenu}>Click to Show Menu!</button>

    {show &&<div className="container">
      {menu.map((item) => (
          <div key={item.idMeal} className="card">
            <h2>{item.idMeal}</h2>
            <h3>{item.strMeal}</h3>
            <p>{item.strArea}</p>
            <p>{item.strCategory}</p>
            <h4>{item.strInstructions}</h4>
            <img src={item.strMealThumb} alt={item.strMeal} />
          </div>
      ))}
</div>}
    </>
  )
}

export default App
