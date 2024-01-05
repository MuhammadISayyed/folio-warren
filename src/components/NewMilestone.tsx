// TODO
// Display data instantly and then send the request, unless there's an error, then remove the displayed data.

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { MilestoneType } from '../types'

type NewMilestoneProps = {
  setMilestones: React.Dispatch<React.SetStateAction<MilestoneType[] | null>>
  milestones: MilestoneType[] | null
  goalId: string | undefined
}

const NewMilestone = ({ setMilestones, milestones, goalId }: NewMilestoneProps) => {
  const [newMilestone, setNewMilestone] = useState('')

  const handleMilestoneAddClick = async () => {
    const { error } = await supabase
      .from('milestone')
      .insert({ milestone: newMilestone, goal_id: goalId })
    if (error) console.log(error)

    const { data: latestMilestone } = await supabase
      .from('milestone')
      .select()
      .eq('milestone', newMilestone)
    console.log(latestMilestone)

    // The error is here 😀
    milestones !== null &&
      setMilestones([
        ...milestones,
        // @ts-expect-error data is possibly null because it comes from supabase
        { ...latestMilestone[0] },
      ])

    console.log(milestones)

    setNewMilestone('')
  }

  return (
    <div>
      <label>
        Add a new milestone:
        <input type="text" value={newMilestone} onChange={(e) => setNewMilestone(e.target.value)} />
        <button type="button" onClick={handleMilestoneAddClick}>
          Add
        </button>
      </label>
    </div>
  )
}

export default NewMilestone
