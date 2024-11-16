import { useAuthContext } from './useAuthContext'
import { useTasksContext } from './useTasksContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: tasksDispatch } = useTasksContext()

  const logout = () => {
    // removing user from localstorage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

    // clearing tasksContext cause if not the context will be the same until next login
    tasksDispatch({ type: 'SET_TASKS', payload: null })
  }

  return { logout }
}