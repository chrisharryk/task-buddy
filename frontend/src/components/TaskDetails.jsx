import { useTasksContext } from '../hooks/useTasksContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

export default function TaskDetails({ task }) {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  async function handleClick() {
    if (!user) return

    const res = await fetch(`/api/tasks/${task._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await res.json()

    if (res.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json })
    }
  }

  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p><strong>Description: </strong>{task.description}</p>
      <p>{formatDistanceToNow(new Date(task.createdAt), { addSufix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  )
}