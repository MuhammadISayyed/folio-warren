import { getUser } from '../lib/authActions'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Goals from './pages/Goals'
import Goal from './pages/Goal'
import NewGoalForm from './pages/NewGoalForm'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import './App.css'

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
    <div className="container">
      <Router>
        <Routes>
          {<Route path="/" element={<Home userId={userId} />} />}
          {<Route path="sign-in" element={<SignIn />} />}
          {userId != undefined && (
            <Route path="new-goal" element={<NewGoalForm userId={userId} />} />
          )}
          {userId != undefined && <Route path="goals" element={<Goals userId={userId} />} />}
          {userId != undefined && <Route path="goals/:goalId" element={<Goal userId={userId} />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
