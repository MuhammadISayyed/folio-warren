import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useParams } from 'react-router-dom'
import Milestone from '../components/Milestone'
import { MilestoneType } from '../types'
import NewMilestone from '../components/NewMilestone'
import AppNav from '../components/AppNav'
import styles from '../styles/goal.module.css'
import { ShootingStar } from '@phosphor-icons/react'

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
      <AppNav />
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
        // START HERE 🔅
        <div className={styles.goalContainer}>
          {/* I need to add a badge or something that signals prioritization state */}
          <h1 className={styles.goalTitle}>{goal?.title}</h1>
          <p className={styles.goalDescription}>{goal?.description}</p>
          {goal ? (
            <svg
              className={styles.separator}
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 800 400"
            >
              <path
                d="M0.598802387714386,192.8143768310547C11.177644262711206,186.02794901529947,47.70458758870761,152.69461313883463,64.07185363769531,152.09580993652344C80.43911968668301,151.49700673421225,82.4351323445638,191.81636810302734,98.80239868164062,189.2215576171875C115.16966501871745,186.62674713134766,147.70459493001303,136.3273468017578,162.27545166015625,136.52694702148438C176.84630839029947,136.72654724121094,91.81636555989583,187.4251480102539,186.2275390625,190.41915893554688C280.6387125651042,193.41316986083984,638.3233337402344,160.47903696695963,728.7424926757812,154.4910125732422"
                fill="none"
                stroke-width="15"
                stroke='url("#SvgjsLinearGradient1003")'
                stroke-linecap="round"
              ></path>
              <defs>
                <linearGradient id="SvgjsLinearGradient1003">
                  <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
                  <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
          ) : undefined}
          {milestones ? <h2>Milestones</h2> : undefined}
          <ul className={styles.milestones}>
            {milestones?.map((milestone) => (
              <li className={styles.milestone} key={milestone.id}>
                <ShootingStar size={24} color="hsl(37, 99%, 67%)" /> {milestone.milestone}
              </li>
            ))}
          </ul>
          {goal ? (
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>
              Edit
            </button>
          ) : undefined}
        </div>
      )}
    </div>
  )
}

export default Goal
