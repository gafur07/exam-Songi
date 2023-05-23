import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchingLogin, LoginError } from '../../store/reducers/Auth/auth'
import { Form, Input, Button, message } from "antd"

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
                if(res.data.code === 422) {
                    message.error("The phone has already been taken.")
                } else if (res.data.code === 200) {
                    message.success("Success autheration")
                }
                navigate("/login", { replace: true })
            })
            .catch(err => {
                dispatch(LoginError())
                console.log(err)
            })
    }

  return (
    <>
    <div className='auth-cont'>
        <div className='bg'></div>

        <Form onSubmit={register} className='w-[30%] p-8 mx-auto my-auto'>
            <h1 className='text-3xl text-slate-700 font-bold mb-4'>Register</h1>
            <Form.Item rules={[{required: true, message: "Please create username"}]}>
                <Input value={dataForBackend.name} onChange={(e) => setDataForBackend({...dataForBackend, name: e.target.value})} placeholder='Username'/>
            </Form.Item>
            <Form.Item rules={[{required: true, message: "Please create username"}]}>
                <Input value={dataForBackend.phone} onChange={(e) => setDataForBackend({...dataForBackend, phone: e.target.value})} placeholder='Phone'/>
            </Form.Item>
            <Form.Item rules={[{required: true, message: "Please create username"}]}>
                <Input.Password value={dataForBackend.password} onChange={(e) => setDataForBackend({...dataForBackend, password: e.target.value})} placeholder='Password'/>
            </Form.Item>
            <span className='flex justify-between mb-4'>
                <p>Do you have account!</p>
                <Link to={"/login"}>
                  Login
                </Link>  
              </span> 
              <Form.Item>
                <Button disabled={loading} onClick={register}  className='bg-blue-500 w-full' type='primary'>
                    Register
                </Button>
              </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default Register