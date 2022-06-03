const express = require('express')
const Dao = require('./Dao')
const {expressjwt: jwt} = require("express-jwt");
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const saltRounds = 10
const secret = "secret"

const userRole = "user"
const adminRole = "admin"

const app = express()

app.use(express.json())

// User Curls

app.post('/signup', (req, res) => {
    const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        role: userRole
    }
    Dao.addUser(user)
        .then(_ => res.sendStatus(200))
        .catch(err => console.error(err))
})

app.get('/user',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.getUserByUsername(req.query.username)
            .then(user => res.status(200).send({
                username: user.username,
                role: user.role
            }))
            .catch(err => console.error(err))
    }
)

app.get('/users',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.getUsers()
            .then(users => res.status(200).send(users.map(user => {
                return {
                    username: user.username,
                    role: user.role
                }
            })))
            .catch(err => console.error(err))
    }
)

app.put('/user',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.updateUser(req.query.username, {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
            .then(_ => res.sendStatus(200))
            .catch(err => console.error(err))
    }
)

app.delete('/user',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.deleteUserByUsername(req.query.username)
            .then(_ => res.sendStatus(200))
            .catch(err => console.error(err))
    }
)

app.post('/user',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        if (req.auth.role === adminRole) {
            const user = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, saltRounds),
                role: userRole
            }
            Dao.addUser(user)
                .then(_ => res.sendStatus(200))
        } else {
            res.sendStatus(403)
        }
    })

app.post('/login', (req, res) => {
    Dao.getUserByUsername(req.body.username)
        .then(user => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.status(200).send({
                        jwt: jsonwebtoken.sign({username: user.username, role: user.role}, secret),
                        user: user
                    })
                } else {
                    res.sendStatus(401)
                }
            }
        ).catch(err => console.error(err))
})

// Reservation curls

app.post('/reservation',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
    const reservation = {
            number: req.body.number,
            startingTime: req.body.startingTime,
            endingTime: req.body.endingTime,
            purpose: req.body.puspose,
        }
        Dao.addReservation(reservation)
            .then(_ => res.sendStatus(200))
            .catch(err => console.error(err))
    })

app.get('/reservations',
    (req, res) => {
        Dao.getReservations()
            .then(reservations => res.status(200).send(reservations))
            .catch(err => console.error(err))
    })

app.delete('/reservation',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.deleteReservationByPurpose(req.query.header)
            .then(_ => res.sendStatus(200))
            .catch(err => console.error(err))
    })

app.put('/reservation',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.updateReservationByPurpose(req.body.header)
            .then(reservation => Dao.addReservation({
                number: req.body.number,
                startingTime: req.body.number,
                endingTime: req.body.number,
                purpose: reservation.body.number,
            }))
            .then(_ => res.sendStatus(200))
            .catch(err => console.error(err))
    })

app.listen(3000, () => console.log("Start..."))
