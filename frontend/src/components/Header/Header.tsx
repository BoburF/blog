import { useState } from "react"
import "./Header.css"

const Header = () => {
  const [account, setAccount] = useState(null)
  return (
    <header>
      <div className="logo">
        <a href="/"><img src="logo.png" alt="" /></a>
      </div>
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      {
        account ? 
        <div className="account left_header"></div>
        : 
        <div className="sign left_header">
          <button>Sign In</button>
          <button>Sign Up</button>
        </div>
      }
    </header>
  )
}

export default Header