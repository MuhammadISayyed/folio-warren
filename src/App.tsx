import { getUser } from '../lib/authActions'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import Goals from './pages/Goals'
import Home from './pages/Home'
import './App.css'
import { supabase } from '../lib/supabaseClient'

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
      <Route
        path="/goals"
        element={<Goals />}
        loader={async () => {
          const user = await getUser()
          const { data: prioritized } = await supabase
            .from('goals')
            .select()
            .eq('user_id', user?.id)
            .eq('prioritized', true)
          const { data: deprioritized } = await supabase
            .from('goals')
            .select()
            .eq('user_id', user?.id)
            .eq('prioritized', false)

          return { prioritized, deprioritized }
        }}
      />
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
  return <RouterProvider router={router} />
}

export default App
