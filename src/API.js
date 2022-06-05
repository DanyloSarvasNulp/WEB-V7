import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000'

const API = {
    sendLoginRequest: (username, password) =>
        axios.post('/login', {username, password}),
    sendSignupRequest: (username, password) =>
        axios.post('/signup', {username, password}),
    sendEditUserRequest: (jwt, username, body) =>
        axios.put(`/user?username=${username}`,
            body, {
                headers: {Authorization: `Bearer ${jwt}`}
            }),
    sendDeleteUserRequest: (jwt, username) =>
        axios.delete(`/user?username=${username}`,
            {
                headers: {Authorization: `Bearer ${jwt}`}
            }),
    getAllUsers: (jwt) =>
        axios.get('/users', {headers: {Authorization: `Bearer ${jwt}`}}),
    getAllPostedArticles: () =>
        axios.get('/articles'),
    getAllEditedArticles: (jwt) =>
        axios.get('/articles/approve', {headers: {Authorization: `Bearer ${jwt}`}}),
    createArticle: (jwt, header, body) =>
        axios.post('/article', {header, body}, {headers: {Authorization: `Bearer ${jwt}`}}),
    updateArticle: (jwt, header, body) =>
        axios.put('/article', {header, body}, {headers: {Authorization: `Bearer ${jwt}`}}),
    getArticleByHeader: (jwt, header) =>
        axios.get(`/article?header=${header}`, {headers: {Authorization: `Bearer ${jwt}`}}),
    approveArticleByHeaderAndUsername: (jwt, header, username) =>
        axios.post('article/approve', {header, author: username}, {headers: {Authorization: `Bearer ${jwt}`}}),
    deleteArticleByHeaderAndUsername: (jwt, header, username) =>
        axios.delete(`article?header=${header}&author=${username}`, {headers: {Authorization: `Bearer ${jwt}`}}),
}

export default API;
