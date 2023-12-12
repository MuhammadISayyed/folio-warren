// Add react router
// Create a component for the goal form
// Create an index for the goals list
// Manage permissions

import { getUserSession } from '../lib/authActions'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NewGoal from './pages/NewGoal'
import Goals from './pages/Goals'

const App = () => {
  const [user, setUser] = useState<string | undefined>('')
  useEffect(() => {
    const setUserSession = async () => {
      const { session } = await getUserSession()

      setUser(session?.user?.id)
    }
    setUserSession()
  }, [])

  // if (!user) {
  //   return (
  //     <Router>
  //       <Routes>
  //         <Route path="*" element={<Home />} />
  //       </Routes>
  //     </Router>
  //   )
  // }

  return (
    <Router>
      <div>
        <Nav user={user} />
      </div>

      <Routes>
        {user && <Route path="new-goal" element={<NewGoal user={user} />} />}
        {user && <Route path="goals" element={<Goals user={user} />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
