/*
Now, what does it take to edit a goal?
1. isEditing state, but we don't need it, as we'll be editing in a completely different page.
2. We get the form data, but we can fetch it using the loader.
3. We manage the data
*/

import { supabase } from '../../lib/supabaseClient'
import { useLoaderData } from 'react-router-dom'
import { type GoalType, MilestoneType } from '../types'
// import NewMilestone from '../components/NewMilestone'
import AppNav from '../components/AppNav'
import styles from '../styles/goal.module.css'
import { ShootingStar } from '@phosphor-icons/react'
import { getUser } from '../../lib/authActions'
import { Link } from 'react-aria-components'

export const goalLoader = async ({ params }) => {
  const user = await getUser()

  const { data: goal } = await supabase
    .from('goals')
    .select()
    .eq('user_id', user?.id)
    .eq('id', params.goalId)

  const { data: milestones } = await supabase
    .from('milestone')
    .select()
    .eq('goal_id', params.goalId)
  return { goal, milestones }
}

const Goal = () => {
  const loader = useLoaderData() as { goal: GoalType[]; milestones: MilestoneType[] }
  const goal = loader.goal[0]
  console.log(loader)
  const milestones = loader.milestones
  return (
    <div>
      <AppNav />
      <div className={styles.goalContainer}>
        <h1 className={styles.goalTitle}>{goal.title}</h1>
        <p className={styles.goalDescription}>{goal.description}</p>
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
          <Link className="buttoned-link" href={`/goals/${goal.id}/edit`}>
            Edit
          </Link>
        ) : undefined}
      </div>
    </div>
  )
}

export default Goal
