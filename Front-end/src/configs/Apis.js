import axios from "axios";


export let endpoints = {
    "categories": "/categories/",
    'oauth2-info': '/oauth2-info/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'tours': '/tours/',
    'tour-detail': (tourId) => `/tours/${tourId}/`,

    // 'tour-admin-detail': (tourId) => `/tours/${tourId}/`,

    'comments': (tourId) => `/tours/${tourId}/comments/`,
    'add-comment': (tourId) => `/tours/${tourId}/add-comment/`,
    'rating': (tourId) => `/tours/${tourId}/rating/`,
    'like': (tourId) => `/tours/${tourId}/like/`,
    'views': (tourId) => `/tours/${tourId}/views/`,
    'articals': '/articals/',
    'artical-detail': (articalId) => `/articals/${articalId}/`,

    'artical-admin-detail': (articalId) => `/articals/${articalId}/`,

    'comments': (articalId) => `/articals/${articalId}/comments/`,
    'add-comment': (articalId) => `/articals/${articalId}/add-comment/`,
}


export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

