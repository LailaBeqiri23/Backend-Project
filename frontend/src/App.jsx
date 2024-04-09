import { useState } from 'react'

import './App.css'

function App() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

const handelUsernameChange = (e) => {
  setUsername(e.target.value)
}

const handelEmailChange = (e) => {
  setEmail(e.target.value)
}

const handelPassswordChange = (e) => {
  setPassword(e.target.value)
}

  const handleRegister = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    console.log(response)
    
  }

  return (
    <>
     <form onSubmit={handleRegister}>
      <input type="text" name="username" placeholder="username" onChange={handelUsernameChange}/>
      <input type="email" name="email" placeholder="Email" onChange={handelEmailChange}/>
      <input type="password" name="password" placeholder="Password" onChange={handelPassswordChange}/>
      <input type="submit" value="Register" />
     </form>
    </>
  )
}

export default App
