import React, {useContext, useEffect, useState} from 'react';
import '../styles/styles.css'
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context";
import API from "../API";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";

const Signup = () => {
    const {setJwt, setUsername, setRole} = useContext(AuthContext)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setJwt('')
        setUsername('')
        setRole('')
    },[])

    const sendSignupRequest = () => {

        if (password === confirmPassword &&
            login !== '' && password !== '') {
            API.sendSignupRequest(login, password)
                .then(res => {
                    if (res.status === 200) {
                        navigate('/login')
                    }
                }).catch(err => {
                setError(true)
                console.log(err)
            })
        }
        setLogin('')
        setPassword('')
        setConfirmPassword('')
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
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <MyInput
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    required
                />
                <MyButton onClick={sendSignupRequest}>Sign-up</MyButton>
                <MyButton><Link className="navigation-btn" to="/login">Have an account? Log in</Link></MyButton>
            </form>
        </div>
    );
}

export default Signup;
