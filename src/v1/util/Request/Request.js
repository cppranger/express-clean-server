const axios = require('axios')
const isEmpty = require('../isEmpty')

/**
Wrapper-class for axios
 it creates Request object with certain baseUrl
 which will be used for sending request to certain servers
 it has static private functions _setParams (creates params string to use in URL),
 _validate (validates request object)
 and also ordinary Request object functions get, post, put, delete (ordinary CRUD operations)
 that take request object { url (which will be added to baseUrl), params, query, body }
 */
class Request {
    static _setParams (params) {
        return Object.keys(params).map(item => encodeURIComponent(item) + '=' + encodeURIComponent(params[item])).join('&')
    }

    static _validate (request) {
        if (isEmpty(request)) request = {}
        if (isEmpty(request.url)) request.url = ''
        if (isEmpty(request.params)) request.params = ''
        if (isEmpty(request.query)) request.query = {}
        if (isEmpty(request.body)) request.body = {}
        return request
    }

    constructor(url) {
        this.baseUrl = url
    }

    get(request) {
        request = Request._validate(request)
        const query = Request._setParams(request.query)
        return axios.get(this.baseUrl + request.url + '?' + query)
    }

    post(request) {
        request = Request._validate(request)
        return axios.post(this.baseUrl + request.url, request.body)
    }

    put(request) {
        request = Request._validate(request)
        const query = Request._setParams(request.query)
        return axios.put(this.baseUrl + request.url + '?' + query, request.body)
    }

    delete(request) {
        request = Request._validate(request)
        const query = Request._setParams(request.query)
        return axios.delete(this.baseUrl + request.url + '?' + query)
    }
}

module.exports = Request
