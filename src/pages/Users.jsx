import React, {useContext, useEffect} from 'react';
import '../styles/styles.css'
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const {role} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        if(role !== 'admin'){
            navigate('/user')
        }
    },[])

    return (
        <div className="body">
        </div>
    );
}

export default Users;
