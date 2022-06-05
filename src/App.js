import React, {useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

function App() {
    const [jwt, setJwt] = useState('')
    const [username, setUsername] = useState('')
    const [role,setRole] = useState('')

    return (
        <AuthContext.Provider value={{
            jwt,
            setJwt,
            username,
            setUsername,
            role,
            setRole
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
