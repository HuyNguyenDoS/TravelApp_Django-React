import axios from "axios";


export let endpoints = {
    "categories": "/categories/",
    'oauth2-info': '/oauth2-info/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'tours': '/tours/',
    'tour-detail': (tourId) => `/tourdetail/${tourId}/`,
    'comments': (tourId) => `/tours/${tourId}/comments/`,
    'add-comment': (tourId) => `/tours/${tourId}/add-comment/`,
}


export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

