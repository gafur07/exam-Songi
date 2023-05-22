import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchingLogin, LoginError } from '../../store/reducers/Auth/auth'

const Register = () => {
    const { token, loading } = useSelector(store => store.auth)

    const [dataForBackend, setDataForBackend] = useState({
        name: "",
        phone: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if(token) {
            navigate("/", {replace: true})
        }
    },[])

    function register(e) {
        e.preventDefault()
        dispatch(fetchingLogin())
            axios
            .post("http://todo.paydali.uz/api/register", dataForBackend)
            .then(res => {
                navigate("/login", { replace: true })
            })
            .catch(err => {
                dispatch(LoginError())
            })
    }

  return (
    <>
    <div className='auth-cont'>
        <div className='bg'></div>

        <form onSubmit={register}>
            <input value={dataForBackend.name} onChange={(e) => setDataForBackend({...dataForBackend, name: e.target.value})} type="text" placeholder='Name'/>
            <input value={dataForBackend.phone} onChange={(e) => setDataForBackend({...dataForBackend, phone: e.target.value})} type="text" placeholder='Phone'/>
            <input value={dataForBackend.password} onChange={(e) => setDataForBackend({...dataForBackend, password: e.target.value})} type="password" placeholder='Password'/>
            <button>Register</button>
        </form>
    </div>
    </>
  )
}

export default Register