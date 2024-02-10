export type MilestoneType = { milestone: string; id: string }
export type GoalProps = {
  id: string
  title: string
  description: string
  prioritized: boolean
  createdAt?: string
  updatedAt?: string
  user_id?: string
}
