import axios from "axios";
import { combineReducers } from "redux";

export let endpoints = {
    'oauth2-info': '/oauth2-info/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',

    "categories": "/categories/",
    'tours': '/tours/',
    'tour-detail': (tourId) => `/tourdetail/${tourId}/`,
    
    'comments': (tourId) => `/tours/${tourId}/comments/`,
    'add-comment': (tourId) => `/tours/${tourId}/add-comment/`,
    "rating": (tourId) => `/tours/${tourId}/rating/`
}


export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})
