// Add react router
// Create a component for the goal form
// Create an index for the goals list
// Manage permissions

import { getUser } from '../lib/authActions'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NewGoal from './pages/NewGoal'
import Goals from './pages/Goals'

const App = () => {
  const [userId, setUserId] = useState<string | undefined>('')
  useEffect(() => {
    const setCurrentUser = async () => {
      const user = await getUser()
      // console.log(user)
      setUserId(user?.id)
    }
    setCurrentUser()
  }, [])

  return (
    <Router>
      <div>
        <Nav userId={userId} />
      </div>

      <Routes>
        {userId != undefined && <Route path="new-goal" element={<NewGoal userId={userId} />} />}
        {userId != undefined && <Route path="goals" element={<Goals userId={userId} />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
