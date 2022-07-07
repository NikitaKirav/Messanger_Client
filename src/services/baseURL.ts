export const baseUrl_Http = process.env.NODE_ENV === 'production' 
    ? window.location.protocol + '//' + window.location.hostname + '/api-messanger/' 
    : window.location.protocol + '//' + window.location.hostname + ':4040/api-messanger/';

export const baseUrl_Ws = process.env.NODE_ENV === 'production' 
    ? 'ws://' + window.location.hostname + '/wss/' 
    : 'ws://' + window.location.hostname + ':8081';

export const baseUrl = process.env.NODE_ENV === 'production' 
    ? window.location.protocol + '//' + window.location.hostname 
    : window.location.protocol + '//' + window.location.hostname + ':4040';