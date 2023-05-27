import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../../API/api'
import { homeTodo } from '../../store/reducers/Home/home.actions'

const Home = () => {
    const { todos } = useSelector(store => store.todos)
    const dispatch = useDispatch()
    const [taskInput, setTaskInput] = useState("")
    useEffect(() => {
        dispatch(homeTodo())
      },[])
      console.log(todos);
      
    async  function createTask(e) {
        e.preventDefault()
        const dataPost = {
            task: taskInput,
            category_id: 3
          }
        
       await axios
        .post(`${baseURL}/tasks`, dataPost, {
          headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(res => {
          dispatch(homeTodo())
          setTaskInput("")
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          console.log(dataPost);
        })
    }

    function deleteTask(id) {
      axios
        .delete(`${baseURL}/tasks/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(res => {
          dispatch(homeTodo())
        })
    }
 

  return (
    <div>
      <form onSubmit={createTask}>
        <input className='border-2 border-gray-500' value={taskInput} onChange={e => setTaskInput(e.target.value)} type="text" placeholder='Add task' />
        <button>Add</button>
      </form>
      <ul>
          {todos.map(item => (
            <li key={item.id}>
              <span>{item.task}</span> 
              <button className='bg-red-500' onClick={() => deleteTask(item.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Home