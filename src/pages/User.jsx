import React, {useContext, useEffect, useState} from 'react';
import '../styles/styles.css'
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";
import API from "../API";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import MyLabel from "../components/UI/label/MyLabel";

const User = () => {
    const {username, jwt} = useContext(AuthContext)

    const [newUsername, setNewUsername] = useState(username)

    const navigate = useNavigate()

    useEffect(() => {
        if(username === '' || jwt === '') {
            navigate('/login')
        }
    },[])

    const deleteUser = (e) => {
        e.preventDefault()
        API.sendDeleteUserRequest(username)
            .then(_ => {
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    const logout = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <div className="form">
            <form>

                <MyInput
                    disabled
                    type="text"
                    placeholder="Username string"
                    value="Username:"/>
                <MyInput
                    disabled
                    type="text"
                    placeholder="Username"
                    value= {newUsername}
                    onChange={e => setNewUsername(e.target.value)}
                />
                <MyButton onClick={deleteUser}>Delete</MyButton>
                <MyButton onClick={logout}>Logout</MyButton>
            </form>
        </div>
    );
}

export default User;
