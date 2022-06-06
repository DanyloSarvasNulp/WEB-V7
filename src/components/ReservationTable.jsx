import React from 'react';
import classes from '../styles/UserTable.module.css'
import MyButton from "./UI/button/MyButton";

const ReservationTable = ({users, title, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>

            <table className={classes}>
                <tr>
                    <th>First Name</th>
                    <th>Second Name</th>
                    <th>Username</th>
                    <th>Delete</th>
                </tr>
                {users.map((user) =>
                    <tr>
                        <th>{user.firstName}</th>
                        <th>{user.secondName}</th>
                        <th>{user.username}</th>
                        <th><MyButton onClick={() => remove(user)}>Delete</MyButton></th>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default ReservationTable;
