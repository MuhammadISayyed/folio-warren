import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useParams } from 'react-router-dom'
import Milestone from '../components/Milestone'
import { MilestoneType } from '../types'
import NewMilestone from '../components/NewMilestone'

type GoalProps = {
  userId: string | undefined
}

const Goal = ({ userId }: GoalProps) => {
  const [goal, setGoal] = useState<{
    id: string
    title: string
    description: string
    prioritized: boolean
  } | null>(null)
  const [milestones, setMilestones] = useState<MilestoneType[] | null>(null)

  const [formData, setFormData] = useState<{
    title?: string
    description?: string
    prioritized?: boolean
  }>({ title: '', description: '', prioritized: false })
  const [isEditing, setIsEditing] = useState(false)
  const { goalId } = useParams()
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
        setFormData({
          title: goal?.title,
          description: goal?.description,
          prioritized: goal?.prioritized,
        })
      }

      if (goalId) {
        const retrieveMilestones = async () => {
          const retreivedMilestones = await supabase
            .from('milestone')
            .select()
            .eq('goal_id', goalId)

          console.log(retreivedMilestones.data)
          setMilestones(retreivedMilestones.data)
        }
        retrieveMilestones()
      }
    }

    fetchGoal()
  }, [userId, goalId, goal?.title, goal?.description, goal?.prioritized])

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
      .eq('user_id', userId)
      .eq('id', goalId)

    if (goalError) console.log(goalError)
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <form onSubmit={handleFormSubmit}>
            <label>
              Goal:
              <input
                type="text"
                value={formData?.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={formData?.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </label>
            <label>
              prioritized?
              <input
                type="checkbox"
                checked={formData.prioritized}
                onChange={(e) => setFormData({ ...formData, prioritized: e.target.checked })}
              />
            </label>
            <label>
              Milestones
              {milestones != null ? (
                <ul>
                  {milestones?.map((milestone) => (
                    <Milestone
                      key={milestone.id}
                      milestone={milestone}
                      setMilestones={setMilestones}
                      milestones={milestones}
                      goalId={goalId}
                    />
                  ))}
                </ul>
              ) : undefined}
            </label>

            <NewMilestone setMilestones={setMilestones} milestones={milestones} goalId={goalId} />

            <button type="submit">Save</button>
          </form>
        </div>
      ) : (
        <div>
          <p>{goal?.title}</p>
          {milestones?.map((milestone) => (
            <div key={milestone.id}>{milestone.milestone}</div>
          ))}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  )
}

export default Goal
