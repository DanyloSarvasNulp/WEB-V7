import React from 'react';

const UserItem = (props) => {
    return (
        <div className="user">
            <div>
                <strong>{props.user.firstName}</strong>
                <strong>{props.user.secondName}</strong>
                <strong>{props.user.username}</strong>
            </div>
        </div>
    )
}

export default UserItem;
