import { getUser } from '../lib/authActions'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import NewGoal from './pages/NewGoal'
import Goals from './pages/Goals'
import Goal from './pages/Goal'
import NewGoalForm from './pages/NewGoalForm'

const App = () => {
  const [userId, setUserId] = useState<string | undefined>('')
  useEffect(() => {
    const setCurrentUser = async () => {
      const user = await getUser()
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
        {userId != undefined && <Route path="new-goal" element={<NewGoalForm userId={userId} />} />}
        {userId != undefined && <Route path="goals" element={<Goals userId={userId} />} />}
        {userId != undefined && <Route path="goals/:goalId" element={<Goal userId={userId} />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
