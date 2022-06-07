import React, {useContext, useEffect, useState} from 'react';
import '../styles/styles.css'
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import API from "../API";
import {AuthContext} from "../context";

const Login = () => {
    const {setJwt, setUsername, setRole} = useContext(AuthContext)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setJwt('')
        setUsername('')
        setRole('')
    }, [])

    const sendLoginRequest = (e) => {
        e.preventDefault()
        if (login === '' || password === '') {
            setError(true)
        } else {
            API.sendLoginRequest(login, password)
                .then(res => {
                    setError(false)
                    setJwt(res.data.jwt)
                    setUsername(res.data.user.username)
                    setRole(res.data.user.role)
                    navigate('/user')
                })
                .catch(err => {
                    setError(true)
                    console.error(err)
                })
        }
    }

    return (
        <div className="form">
            <form>
                <MyInput
                    type="text"
                    placeholder="Username"
                    value={login}
                    onChange={event => setLogin(event.target.value)}
                    required
                />
                <MyInput
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <MyButton onClick={sendLoginRequest}>Login</MyButton>
                <MyButton><Link className="navigation-btn" to="/signup">Don't have an account? Sign up</Link></MyButton>
            </form>
        </div>
    );
}

export default Login;
