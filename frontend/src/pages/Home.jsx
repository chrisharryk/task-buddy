import { useEffect } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from '../hooks/useAuthContext'

import TaskDetails from '../components/TaskDetails'
import TaskForm from "../components/TaskForm"

export default function Home() {
  const { tasks, dispatch } = useTasksContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_TASKS', payload: json })
      }
    }

    if (user) fetchTasks()
  }, [dispatch, user])

  return (
    <>
      <div className="home">
        <div className="tasks">
          {
            tasks && tasks.map(task => (
              <TaskDetails key={task._id} task={task} />
            ))
          }
        </div>
        <TaskForm />
      </div>
    </>
  )
}