// Render the goal from supabase
// Display all fields and make them editable
// On save, data should be sent to supabase

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useParams } from 'react-router-dom'

type GoalProps = {
  userId: string | undefined
}

// type GoalState = {
//   id?: string
//   title?: string
//   description?: string
//   prioritized?: boolean
//   changeToPrioritize?: string
// }

const Goal = ({ userId }: GoalProps) => {
  const [goal, setGoal] = useState<{ id: string; title: string } | null>(null)
  const { goalId } = useParams()
  // Just render the goal
  // const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    const fetchGoal = async () => {
      const { data, error } = await supabase
        .from('goals')
        .select()
        .eq('user_id', userId)
        .eq('id', goalId)

      if (error) console.log(error)

      console.log(data)

      if (data) {
        setGoal(data[0])
      }
    }

    fetchGoal()
  }, [userId, goalId])

  return (
    <div>
      <p>{goal?.title}</p>
    </div>
  )
}

export default Goal
