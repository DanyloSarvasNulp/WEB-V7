import React, {useContext, useEffect, useState} from 'react';
import '../styles/styles.css'
import classes from "../styles/UserTable.module.css";
import MyButton from "../components/UI/button/MyButton";
import {Link, useNavigate} from "react-router-dom";
import API from "../API";
import MyInput from "../components/UI/input/MyInput";
import {AuthContext} from "../context";

const Signup = () => {

    const [reservations, setReservations] = useState([])
    const navigate = useNavigate()

    const {username, jwt} = useContext(AuthContext)

    const [auditoriumField, setAuditoriumField] = useState('')
    const [startingTimeField, setStartingTimeField] = useState('')
    const [endingTimeField, setEndingTimeField] = useState('')
    const [purposeField, setPurposeField] = useState('')

    useEffect(() => {
        API.getAllReservations()
            .then(res => {
                console.log(res)
                setReservations(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const sendCreateReservation = (e) => {
        e.preventDefault()
        if(purposeField === ''){
            return
        }
        API.createReservation({
            number: auditoriumField,
            creator: username,
            startingTime: startingTimeField,
            endingTime: endingTimeField,
            purpose: purposeField
        })
        setAuditoriumField('')
        setStartingTimeField('')
        setEndingTimeField('')
        setPurposeField('')
        API.getAllReservations()
            .then(res => {
                console.log(res)
                setReservations(res.data)
            })
    }

    const sendDeleteReservationByPuspose = (reservation, e) => {

        if(reservation.creator !== username){
            return
        }

        API.deleteReservationByPurpose(reservation.purpose)
        API.getAllReservations()
            .then(res => {
                console.log(res)
                setReservations(res.data)
            })
    }

    return (
        <div>
            <form>
                <MyInput
                    type="text"
                    placeholder="Auditorium"
                    value={auditoriumField}
                    onChange={event => setAuditoriumField(event.target.value)}
                    required
                />
                <MyInput
                    type="time"
                    placeholder="StartingTime"
                    value={startingTimeField}
                    onChange={event => setStartingTimeField(event.target.value)}
                    required
                />
                <MyInput
                    type="time"
                    placeholder="EndingTime"
                    value={endingTimeField}
                    onChange={event => setEndingTimeField(event.target.value)}
                    required
                />
                <MyInput
                    type="text"
                    placeholder="Puspose"
                    value={purposeField}
                    onChange={event => setPurposeField(event.target.value)}
                    required
                />
                <MyButton type="submit" onClick={sendCreateReservation}>Create Reservation</MyButton>
            </form>

            <reservationList>
            <h1 style={{textAlign: "center"}}>
                Reservations
            </h1>

            <table className={classes}>
                <tr>
                    <th>Auditorium</th>
                    <th>Start Time</th>
                    <th>Ending Time</th>
                    <th>Purpose</th>

                    <th>Delete</th>
                </tr>
                {reservations.map((reservation) =>
                        <tr key={reservation.purpose}>
                            <th>{reservation.number}</th>
                            <th>{reservation.startingTime}</th>
                            <th>{reservation.endingTime}</th>
                            <th>{reservation.purpose}</th>

                            <th><MyButton onClick={() => sendDeleteReservationByPuspose(reservation)}>Delete</MyButton></th>
                        </tr>
                )}
            </table>
            </reservationList>
        </div>
    )
}

export default Signup;
