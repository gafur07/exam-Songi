import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { homeTodo } from '../../store/reducers/Home/home.actions'

const Home = () => {
    const { todos } = useSelector(store => store.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(homeTodo())
    },[])
    console.log(todos)
  return (
    <div>
      {todos.map(item => (
        <h1>{item.task}</h1>
      ))}
    </div>
  )
}

export default Home