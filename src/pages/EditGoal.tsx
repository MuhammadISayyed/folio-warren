import { useState } from 'react'
import { GoalType, MilestoneType } from '../types'
import styles from '../styles/editGoal.module.css'
import { useLoaderData } from 'react-router-dom'
import Milestone from '../components/Milestone'
// import NewMilestone from '../components/NewMilestone'
import { supabase } from '../../lib/supabaseClient'

const EditGoal = () => {
  const loader = useLoaderData() as { goal: GoalType[]; milestones: MilestoneType[] }
  const goal = loader.goal[0]
  console.log(loader)
  const initialMilestones = loader.milestones
  const [formData, setFormData] = useState<GoalType>({
    title: goal.title,
    description: goal.description,
    prioritized: goal.prioritized,
  })
  const [milestones, setMilestones] = useState<MilestoneType[]>(initialMilestones)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    const { error: goalError } = await supabase
      .from('goals')
      .update({
        title: formData.title,
        description: formData.description,
        prioritized: formData.prioritized,
      })
      .eq('user_id', goal.user_id)
      .eq('id', goal.id)

    if (goalError) console.log(goalError)
  }
  return (
    <div>
      <form className={styles.goalForm} onSubmit={handleFormSubmit}>
        <label className={styles.formLabel}>
          Goal:
          <input
            className={styles.formInput}
            type="text"
            value={formData?.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </label>
        <label className={styles.formLabel}>
          <p>Description:</p>
          <input
            className={styles.formInput}
            type="text"
            value={formData?.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </label>
        <label>
          <p>prioritized?</p>
          <input
            type="checkbox"
            checked={formData.prioritized}
            onChange={(e) => setFormData({ ...formData, prioritized: e.target.checked })}
          />
        </label>
        <label>
          <div className={styles.milestonesContainer}>
            <p>Milestones</p>
            {milestones != null ? (
              <div>
                {milestones?.map((milestone) => (
                  <Milestone
                    key={milestone.id}
                    milestone={milestone}
                    setMilestones={setMilestones}
                    milestones={milestones}
                    goalId={goal.id}
                  />
                ))}
              </div>
            ) : undefined}
          </div>
        </label>

        {/* <NewMilestone milestones={milestones} goalId={goal.id} /> */}

        <button className={styles.saveButton} type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditGoal
