import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { useTasks } from "../context/taskContext"

const TaskFormPage = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
  })

  const { createTask, updateTask, tasks } = useTasks()

  const { push, query } = useRouter()

  const handleChange = e => {
    setTask({...task,[e.target.name]: e.target.value})
  }

  const  handleSubmit = e => {
    e.preventDefault()

    if (!query.id) {
      createTask(task.title, task.description)
    } else {
      updateTask(query.id, task)
    }

    push('/')
  }


  useEffect(() =>{
    if (query.id) {
      const taskFound = tasks.find(task => task.id === query.id)
      setTask({title: taskFound.title, description: taskFound.description})
    }
  }, [])

  return (
    <Layout>
      <div className='flex justify-center items-center h-full'>
        <form 
          className='bg-gray-600 p-10 h-2/4'
          onSubmit={handleSubmit}
        >
          <h4
            className='text-3xl mb-7'
          >
            { query.id ? 'Update a Task' : 'Add a Task' }
          </h4>

          <input 
            type="text" 
            placeholder="Write a title"
            className='bg-gray-800 focus:text-gray-100 focus:outline-none py-3 px-4 w-full mb-5 rounded-sm'
            onChange={handleChange}
            name="title"
            value={task.title}
          />
          <textarea 
            rows="2"
            className='bg-gray-800 focus:text-gray-100 focus:outline-none py-3 px-4 w-full mb-5 rounded-sm'
            name="description"
            placeholder="Write a description"
            onChange={handleChange}
            value={task.description}
          ></textarea>

          <button
            className='bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30' 
            disabled={!task.title}
          >
            Save Task
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default TaskFormPage
