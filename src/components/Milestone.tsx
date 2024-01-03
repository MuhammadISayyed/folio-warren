// TODO
// Update milestones from the milestone component
// The milestone schema should be sent completely from here, including the goalId and everything else

import { useState } from 'react'
import { MilestoneType } from '../types'
import { supabase } from '../../lib/supabaseClient'

type MilestoneProps = {
  milestone: MilestoneType
  setMilestones: React.Dispatch<React.SetStateAction<MilestoneType[] | null>>
  milestones: MilestoneType[]
  goalId: string | undefined
}

const Milestone = ({ milestone, setMilestones, milestones, goalId }: MilestoneProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditMilestone = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newMilestonesArr = milestones.filter((milestone) => milestone.id !== id)
    setMilestones([...newMilestonesArr, { id: milestone.id, milestone: e.target.value }])
  }

  const handleSaveButton = async () => {
    const { error } = await supabase
      .from('milestone')
      .update({ milestone: milestone.milestone, goal_id: goalId })
      .eq('id', milestone.id)
    if (error) console.log(error)
  }

  const handleMilestoneDelete = async (id: string) => {
    const { error } = await supabase.from('milestone').delete().eq('id', id)
    if (error) console.log(error)
  }

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={milestone.milestone}
          onChange={(e) => handleEditMilestone(milestone.id, e)}
        />
      ) : (
        <div>
          <li>{milestone.milestone}</li>
          <button onClick={() => handleMilestoneDelete(milestone.id)}>Delete</button>
        </div>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button>
      {isEditing && (
        <button type="submit" onClick={handleSaveButton}>
          Save
        </button>
      )}
    </div>
  )
}

export default Milestone
