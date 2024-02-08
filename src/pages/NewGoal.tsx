import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

type NewGoalProps = {
  userId: string | undefined
}

const NewGoal = ({ userId }: NewGoalProps) => {
  const [goal, setGoal] = useState('')
  const [description, setDescription] = useState('')
  const [prioritized, setPrioritized] = useState(false)
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(goal, description, prioritized)
    const { error } = await supabase
      .from('goals')
      .insert({ title: goal, description: description, user_id: userId, prioritized })
    if (error) console.log(error)
    setGoal('')
    setDescription('')
    setPrioritized(false)
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Add you new goal:{' '}
          <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} />
        </label>
        <label>
          What's your goal about?{' '}
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Prioritze?{' '}
          <input
            type="checkbox"
            checked={prioritized}
            onChange={(e) => setPrioritized(e.target.checked)}
          />
        </label>
        <button type="submit">Add goal</button>
      </form>
    </div>
  )
}

export default NewGoal
