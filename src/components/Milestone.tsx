// TODO
// Update milestones from the milestone component
// The milestone schema should be sent completely from here, including the goalId and everything else

import { useState } from 'react'
import { MilestoneType } from '../types'

type MilestoneProps = {
  milestone: MilestoneType
  setMilestones: React.Dispatch<React.SetStateAction<MilestoneType[] | null>>
  milestones: MilestoneType[]
}

const Milestone = ({ milestone, setMilestones, milestones }: MilestoneProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditMilestone = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newMilestonesArr = milestones.filter((milestone) => milestone.id !== id)
    setMilestones([...newMilestonesArr, { id: milestone.id, milestone: e.target.value }])
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
        <li>{milestone.milestone}</li>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button>
    </div>
  )
}

export default Milestone
