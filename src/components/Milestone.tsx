import { useState } from 'react'
import { MilestoneType } from '../types'
import { supabase } from '../../lib/supabaseClient'
import styles from '../styles/milestone.module.css'
import { ShootingStar } from '@phosphor-icons/react'

type MilestoneProps = {
  milestone: MilestoneType
  setMilestones: React.Dispatch<React.SetStateAction<MilestoneType[]>>
  milestones: MilestoneType[]
  goalId: string | undefined
}

const Milestone = ({ milestone, setMilestones, milestones, goalId }: MilestoneProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditMilestone = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newMilestonesArr = milestones.filter((milestone) => milestone.id !== id)
    setMilestones([...newMilestonesArr, { id: milestone.id, milestone: e.target.value }])
  }

  const handleSaveButton = async (id: string) => {
    const { error } = await supabase
      .from('milestone')
      .update({ milestone: milestone.milestone, goal_id: goalId })
      .eq('id', id)
      .eq('goal_id', goalId)
    if (error) console.log(error)
    setIsEditing(false)
  }

  const handleMilestoneDelete = async (id: string) => {
    const { error } = await supabase.from('milestone').delete().eq('id', id)
    if (error) console.log(error)
    const filteredMilestones = milestones.filter((milestone) => milestone.id != id)
    setMilestones([...filteredMilestones])
  }

  return (
    <div>
      {/* There's a problem here: when I try to edit the last milestone, it deletes the previous one; however, when I try to edit the fist one, it works fine */}
      {isEditing ? (
        <div className={styles.milestone}>
          <input
            className={styles.milestoneInput}
            type="text"
            value={milestone.milestone}
            onChange={(e) => handleEditMilestone(milestone.id, e)}
          />

          <button type="submit" onClick={() => handleSaveButton(milestone.id)}>
            Save
          </button>
        </div>
      ) : (
        <div className={styles.milestone}>
          <div className={styles.milestoneBody}>
            <ShootingStar size={24} color="hsl(37, 99%, 67%)" />
            <div className={styles.milestoneTitle}>{milestone.milestone}</div>
          </div>
          <div className={styles.milestoneButtons}>
            <button type="button" onClick={() => handleMilestoneDelete(milestone.id)}>
              Delete
            </button>
            <button type="button" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Milestone
