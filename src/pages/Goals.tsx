import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react'
import AppNav from '../components/AppNav'

type GoalsProps = {
  userId: string | undefined
}

const Goals = ({ userId }: GoalsProps) => {
  const [goals, setGoals] = useState<{ id: string; title: string }[] | null>([])

  useEffect(() => {
    const fetchGoals = async () => {
      const { data, error } = await supabase.from('goals').select().eq('user_id', userId)

      if (error) console.log(error)

      // console.log(user)
      console.log(data)

      if (data) {
        setGoals(data)
      }
    }
    fetchGoals()
  }, [userId])

  return (
    <div>
      <AppNav />
      {goals?.map((goal) => (
        <Link to={`/goals/${goal.id}`} key={goal.id}>
          {goal.title}
        </Link>
      ))}
    </div>
  )
}

export default Goals
