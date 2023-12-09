import { useState } from 'react'
import { signInWithEmail, signOut } from '../../lib/authActions'

const Nav = () => {
  const [email, setEmail] = useState('')
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email)
    signInWithEmail(email)
    setEmail('')
  }
  return (
    <div>
      <nav>
        <form onSubmit={handleEmailSubmit}>
          <label>
            Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button type="submit">Sign In</button>
        </form>
        <button type="submit" onClick={signOut}>
          Sign out
        </button>
      </nav>
    </div>
  )
}

export default Nav
