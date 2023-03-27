import { useState } from 'react'
import './App.css'
import Header from './componante/Header/Header'
import Shop from './componante/shop/Shop'
import Product from './componante/products/Product'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header></Header>
      <Shop></Shop>
    </div>
  )
}

export default App
