import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000'

const API = {
    sendLoginRequest: (username, password) =>
        axios.post('/login', {username, password}),
    sendSignupRequest: (username, password) =>
        axios.post('/signup', {username, password}),
    sendDeleteUserRequest: (username) =>
        axios.delete(`/user?username=${username}`),
    getAllUsers: () =>
        axios.get('/users'),

    getAllReservations: () =>
        axios.get('/reservations'),
    createReservation: (body) =>
        axios.post('/reservation', body),
    getReservationByPuspose: (header) =>
        axios.get(`/reservation?header=${header}`),
    deleteReservationByPurpose: (header) =>
        axios.delete(`reservation?header=${header}`),
}

export default API;
