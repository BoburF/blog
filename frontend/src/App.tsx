import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <Header ></Header>
      </main>
    </>
  )
}

export default App
