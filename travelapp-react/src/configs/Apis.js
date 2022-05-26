import axios from 'axios'

export let endpoints = {
    'tours': '/tours/',
    'tour-details': (tourId) => `/tours/${tourId}/`,
    'add-comment-tour': (tourId) => `/tours/${tourId}/add-comment/`,
    'tour-comments': (tourId) => `/tours/${tourId}/comments/`,
    'update-slots': (tourId) => `/tours/${tourId}/update-slots/` ,
    'categories': '/categories/',
    'services': '/services/',
    'customers': '/customers/',
    'articals': '/articals/',
    'artical-details': (articalId) => `/articals/${articalId}/`,
    'like': (articalId) => `/articals/${articalId}/like/`,
    'payers': '/payers/',
    'get-payer': (payerId) => `/payers/${payerId}`,
    'artical-comments': (articalId) => `/articals/${articalId}/comments/`,
    'add-comment-artical': (articalId) => `/articals/${articalId}/add-comment/`,
    'rating': (tourId) => `/tours/${tourId}/rating/`,
    'users': '/users/',
    'current-user': '/users/current-user/',
    'login': '/o/token/',
    'change-password': '/users/change-password/',
    'forgot-password': '/reset-password/',
    'verify-token': '/reset-password/validate_token/',
    'reset-password': '/reset-password/confirm/',
    'oauth2-info': '/oauth2-info/',
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})