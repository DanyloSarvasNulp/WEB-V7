import React, {useState} from "react";
import MyInput from "./components/UI/input/MyInput";
import MyButton from "./components/UI/button/MyButton";
import UserTable from "./components/UserTable";

function App() {
    const [users, setUsers] = useState([
        {id: 1, firstName: "Biba", secondName: "Boba", username: "Bibsas"},
        {id: 2, firstName: "Bibi", secondName: "Bobi", username: "Bibsis"},
        {id: 3, firstName: "Bibo", secondName: "Bobo", username: "Bibsos"},
    ])

    const [user, setUser] = useState({
        firstName: '',
        secondName: '',
        username: '',
        password: ''
    })

    const addNewUser = () => {

        if (user.username === '') return
        setUsers([...users, {...user, id: Date.now()}])
        setUser({
            firstName: '',
            secondName: '',
            username: '',
            password: ''
        })
    }

    const removeUserByUsername = (user) => {
        setUsers(users.filter(u => u.username !== user.username))
    }

    return (
        <div className="App">
            <MyInput
                value={user.firstName}
                onChange={e => setUser({...user, firstName: e.target.value})}
                type="text"
                placeHolder="First Name"
                required
            />
            <MyInput
                value={user.secondName}
                onChange={e => setUser({...user, secondName: e.target.value})}
                type="text"
                placeHolder="Second Name"
            />
            <MyInput
                value={user.username}
                onChange={e => setUser({...user, username: e.target.value})}
                type="text"
                placeHolder="Username"
            />
            <MyInput
                value={user.password}
                onChange={e => setUser({...user, password: e.target.value})}
                type="text"
                placeHolder="Password"
            />
            <MyButton onClick={addNewUser}>Create New User</MyButton>

            <UserTable remove={removeUserByUsername} users={users} title={"User List"}/>
        </div>
    );
}

export default App;
