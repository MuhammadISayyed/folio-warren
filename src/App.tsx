import { getUser } from '../lib/authActions'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import Goals from './pages/Goals'
// import Goal from './pages/Goal'
// import NewGoalForm from './pages/NewGoalForm'
// import SignIn from './pages/SignIn'
import Home from './pages/Home'
import './App.css'
// import { supabase } from '../lib/supabaseClient'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Home />}
      loader={async () => {
        const user = await getUser()
        return user
      }}
    >
      {/* {<Route path="/" element={<Home userId={userId} />} />} */}
      {/* <Route path="sign-in" element={<SignIn />} /> */}
      {/* <Route path="new-goal" element={<NewGoalForm} /> */}
      {/* <Route
          path="goals"
          element={<Goals userId={userId} />}
          loader={async () => {
            const user = await getUser()
            return user
          }}
        /> */}

      {/* <Route path="goals/:goalId" element={<Goal />} /> */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Route>
  )
)

const App = () => {
  // const [userId, setUserId] = useState<string | undefined>('')
  // useEffect(() => {
  //   const setCurrentUser = async () => {
  //     const user = await getUser()
  //     setUserId(user?.id)
  //   }
  //   setCurrentUser()
  // }, [])

  return <RouterProvider router={router} />
}

export default App
