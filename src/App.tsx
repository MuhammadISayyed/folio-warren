// Add react router
// Create a component for the goal form
// Create an index for the goals list
// Manage permissions

import { getUserSession } from '../lib/authActions'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NewGoal from './pages/NewGoal'
const App = () => {
  const [user, setUser] = useState<string | undefined>('')
  useEffect(() => {
    const setUserSession = async () => {
      const { session } = await getUserSession()

      setUser(session?.user?.id)
    }
    setUserSession()
  }, [])

  return (
    <Router>
      <div>
        <Nav user={user} />
      </div>
      <Routes>
        <Route path="new-goal" element={<NewGoal user={user} />} />
      </Routes>
    </Router>
  )
}

export default App
