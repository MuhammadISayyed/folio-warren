import { useState, useEffect } from 'react'
import { getUserSession, signInWithEmail, signOut } from '../../lib/authActions'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState<string | undefined>('')
  useEffect(() => {
    const setUserSession = async () => {
      const { session } = await getUserSession()

      setUser(session?.user.id)
    }
    setUserSession()
  }, [])
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
