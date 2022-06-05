import React from 'react';
import {Route, Routes} from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import User from "../pages/User";
import Users from "../pages/Users";
import Reservations from "../pages/Reservations";


const AppRouter = () => {

    return (
        <Routes>
            <Route path="" element={<Signup/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/reservations" element={<Reservations/>}/>
        </Routes>
    );
};

export default AppRouter;
