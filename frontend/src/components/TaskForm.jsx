import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from "../hooks/useAuthContext"

export default function TaskForm() {
	const { dispatch } = useTasksContext()
	const { user } = useAuthContext()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [error, setError] = useState(null)
	const [emptyFields, setEmptyFields] = useState([])

	async function handleSubmit(e) {
		e.preventDefault()

		if (!user) {
			setError('you must be logged in')
			return
		}

		const task = { title, description }

		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${user.token}`
			}
		})

		const json = await res.json()

		if (!res.ok) {
			setError(json.error)
			setEmptyFields(json.emptyFields)
		}

		if (res.ok) {
			setTitle('')
			setDescription('')
			setError(null)
			setEmptyFields([])
			console.log('new task added')
			dispatch({ type: 'CREATE_TASK', payload: json })
		}
	}

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a new Task</h3>
			<label>Task title: </label>
			<input
				type="text"
				onChange={e => setTitle(e.target.value)}
				value={title}
				className={emptyFields.includes('title') ? 'error' : ''}
			/>
			<label>Task description: </label>
			<textarea
				type="text"
				onChange={e => setDescription(e.target.value)}
				value={description}
				id="descIp"
				className={emptyFields.includes('description') ? 'error' : ''}
			/>
			<button>Add task</button>
			{error && <div className="error">{error}</div>}
		</form>
	)
}