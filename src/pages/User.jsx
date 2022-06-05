import React, {useContext, useEffect} from 'react';
import '../styles/styles.css'
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

const User = () => {
    const {jwt} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        if(jwt === ''){
            navigate('/login')
        }
    },[])

    return (
        <div className="body">
        </div>
    );
}

export default User;
