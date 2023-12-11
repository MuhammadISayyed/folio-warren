import { useState } from 'react'
import { signInWithEmail, signOut } from '../../lib/authActions'
import { Link } from 'react-router-dom'

type NavProps = {
  user: string | undefined
}

const Nav = ({ user }: NavProps) => {
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
        {user === undefined ? (
          <form onSubmit={handleEmailSubmit}>
            <label>
              Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button type="submit">Sign In</button>
          </form>
        ) : undefined}
        {user != undefined ? (
          <button type="submit" onClick={signOut}>
            Sign out
          </button>
        ) : undefined}
        {user != undefined ? <Link to="/new-goal">Add new goal</Link> : undefined}
      </nav>
    </div>
  )
}

export default Nav
