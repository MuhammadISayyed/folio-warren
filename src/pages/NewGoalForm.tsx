import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const NewGoalForm = ({ userId }: { userId: string }) => {
  const [goal, setGoal] = useState('')
  const [description, setDescription] = useState('')
  const [prioritized, setPrioritized] = useState(false)
  const [milestone, setMilestone] = useState('')
  const [milestones, setMilestones] = useState<string[]>([])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(goal, description, prioritized, milestones)
    const { error } = await supabase
      .from('goals')
      .insert({ title: goal, description: description, user_id: userId, prioritized })
      .select()
    if (error) console.log(error)

    const { data } = await supabase.from('goals').select().eq('title', goal)
    Promise.all(
      milestones.map((milestone) =>
        // @ts-expect-error data is possibly null because it comes from supabase
        supabase.from('milestone').insert({ milestone: milestone, goal_id: data[0].id })
      )
    )

    setGoal('')
    setDescription('')
    setPrioritized(false)
    setMilestone('')
    setMilestones([])
  }

  const handleMilestoneButtonClick = () => {
    setMilestones([...milestones, milestone])
    console.log(milestones)
    setMilestone('')
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Add your new goal:{' '}
          <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} />
        </label>
        <label>
          What's your goal about?{' '}
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Prioritze the goal?{' '}
          <input
            type="checkbox"
            checked={prioritized}
            onChange={(e) => setPrioritized(e.target.checked)}
          />
        </label>
        <label>
          Milestones
          {milestones.length > 0 ? (
            <ul>
              {milestones.map((milestone, index) => (
                <li key={index}>{milestone}</li>
              ))}
            </ul>
          ) : undefined}
          <input type="text" value={milestone} onChange={(e) => setMilestone(e.target.value)} />
          <button type="button" onClick={handleMilestoneButtonClick}>
            Add a new milestone
          </button>
        </label>
        <button type="submit">Add goal</button>
      </form>
    </div>
  )
}

export default NewGoalForm
