const statuses = require('./httpStatuses')

/**
 class Response makes standardized response to client
 it takes object with
 res: <response object to send respond and set headers>
 status: <http status: Number>
    if no type status, it sets to 200 automatically
 type: <response type: String ('json', 'html', etc.)>
    if no type passed, it sets to 'json' automatically
 message: <any data that sends to client>
 result: will be generated, depends on status (code 4__ and 5__ is false, any other is true)

 example of generated object:
    response = {
        "status": "I'm Teapot",
        "result": false,
        <"message": no message passed>
    }
    type: 'json',
    status: 418
 */
class Response {
    static checkStatus (status) {
        return !status.toString().startsWith('4') && !status.toString()[0].startsWith('5')
    }

    constructor (responseObject) {
        const status = responseObject.status
            ? responseObject.status
            : 200
        const type = responseObject.type !== undefined
            ? responseObject.type
            : 'json'
        const result = Response.checkStatus(status)
        let response = { status: statuses[responseObject.status], result }
        if (responseObject.message) response.message = responseObject.message
        this.response = JSON.stringify(response)
        this.res = responseObject.res
        this.res.type(type)
        this.res.status(status)
    }

    send () {
        this.res.send(this.response)
    }
}

module.exports = Response
