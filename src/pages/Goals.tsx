// TODO
// 0. Revise how you fetch data and get rid of useEffect
// 1. Limit prioritized goals to 5
// 2. Add a separator to the end of each goal

import { Link, useLoaderData } from 'react-router-dom'
import AppNav from '../components/AppNav'
import styles from '../styles/goals.module.css'
import { type GoalProps } from '../types'

const Goals = () => {
  // fetching the userId && managing goals states
  const loader = useLoaderData() as {
    prioritized: GoalProps[] | null
    deprioritized: GoalProps[] | null
  }
  console.log(loader)
  const prioritized = loader?.prioritized ?? []
  const deprioritized = loader?.deprioritized ?? []

  return (
    <div>
      <p>Hello goals</p>
      <AppNav />
      <div>
        <h2>Prioritized Goals</h2>
        <div className={styles.goalsContainer}>
          {prioritized?.map((goal) => (
            <div>
              <Link to={`/goals/${goal.id}`} className={styles.goalLink} key={goal.id}>
                <span className={styles.goalTitle}>{goal.title}</span>
                <span className={styles.goalDescription}>{goal.description}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Deprioritized Goals</h2>
        <div className={styles.goalsContainer}>
          {deprioritized?.map((goal) => (
            <div>
              <Link to={`/goals/${goal.id}`} className={styles.goalLink} key={goal.id}>
                <span className={styles.goalTitle}>{goal.title}</span>
                <span className={styles.goalDescription}>{goal.description}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Goals
