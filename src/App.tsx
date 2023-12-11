import { getUserSession } from '../lib/authActions'
import Nav from './components/Nav'
import { useEffect, useState } from 'react'
const App = () => {
  const [user, setUser] = useState<string | undefined>('')
  useEffect(() => {
    const setUserSession = async () => {
      const { session } = await getUserSession()

      setUser(session?.user?.email)
    }
    setUserSession()
  }, [])

  return (
    <div>
      <Nav />
      <h1>{user}</h1>
    </div>
  )
}

export default App
