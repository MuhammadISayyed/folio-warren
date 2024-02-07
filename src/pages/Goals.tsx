// TODOS
// 1. Separate prioritized from deprioritized goals
// 2. Sort goals by date

import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react'
import AppNav from '../components/AppNav'
import styles from '../styles/goals.module.css'

type GoalsProps = {
  userId: string | undefined
}

const Goals = ({ userId }: GoalsProps) => {
  const [prioritizedGoals, setPrioritizedGoals] = useState<
    { id: string; title: string; description: string }[] | null
  >([])
  const [deprioritizedGoals, setDeprioritizedGoals] = useState<
    { id: string; title: string; description: string }[] | null
  >([])

  useEffect(() => {
    const fetchGoals = async () => {
      // Fetch prioritized goals
      const { data: prioritized, error: errWithPrioritized } = await supabase
        .from('goals')
        .select()
        .eq('user_id', userId)
        .eq('prioritized', true)
        .order('updated_at', { ascending: true })
      if (errWithPrioritized) console.log(errWithPrioritized)
      if (prioritized) {
        setPrioritizedGoals(prioritized)
      }

      // Fetch deprioritized goals
      const { data: deprioritized, error: errWithDeprioritized } = await supabase
        .from('goals')
        .select()
        .eq('user_id', userId)
        .eq('prioritized', false)
        .order('updated_at', { ascending: true })
      if (errWithDeprioritized) console.log(errWithDeprioritized)
      if (deprioritized) {
        setDeprioritizedGoals(deprioritized)
      }
    }
    fetchGoals()
  }, [userId])

  return (
    <div>
      <AppNav />
      <div>
        <h2>Prioritized Goals</h2>
        <div className={styles.goalsContainer}>
          {prioritizedGoals?.map((goal) => (
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
          {deprioritizedGoals?.map((goal) => (
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
