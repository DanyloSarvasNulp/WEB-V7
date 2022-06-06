import React from 'react';
import classes from './MyLabel.module.css'

const MyLabel = (props) => {
    return (
        <label className={classes} {...props}/>
    );
};

export default MyLabel;
