import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchedLogin, fetchingLogin, LoginError } from '../../store/reducers/Auth/auth'
import { Form, Input, Button, message } from "antd"

const Login = () => {
    const { users, token, loading } = useSelector(store => store.auth)

    const [dataForBackend, setDataForBackend] = useState({
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

    function login(e) {
        e.preventDefault()
        dispatch(fetchingLogin())
            axios
            .post("http://todo.paydali.uz/api/login", dataForBackend)
            .then(res => {
              if(res.data.code === 422) {
                message.error("The selected phone is invalid.")
              }  else if(res.data.code === 200) {
                message.success("Successfull")
              }
              dispatch(fetchedLogin({
                payload: {
                  users: res.data.payload,
                  token: res.data.payload.token
                }
              }))
              
              localStorage.setItem("token", res.data.payload.token)
                navigate("/", { replace: true })
            })
            .catch(err => {
                dispatch(LoginError())
                console.log(err);
            })
    }

  return (
    <>
    <div className='auth-cont'>
        <div className='bg'></div>

        <Form className='w-[30%] p-8 mx-auto my-auto'>
            <h1 className='text-3xl text-slate-700 font-bold mb-4'>Login</h1>
            <Form.Item>
                <Input value={dataForBackend.phone} onChange={(e) => setDataForBackend({...dataForBackend, phone: e.target.value})} placeholder='Phone'/>
            </Form.Item>
            <Form.Item>
                <Input.Password value={dataForBackend.password} onChange={(e) => setDataForBackend({...dataForBackend, password: e.target.value})} placeholder='Password'/>
            </Form.Item>
              <span className='flex justify-between mb-4'>
                <p>Do you don't have account!</p>
                <Link to={"/register"}>
                  Register
                </Link>  
              </span>  
            <Form.Item>
                <Button disabled={loading} onClick={login} className='bg-blue-500 w-full' type='primary'>
                    Login
                </Button>
            </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default Login