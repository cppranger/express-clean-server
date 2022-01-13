const Request = require('../../util/Request/Request')
const Response = require('../../util/Response/Response')

const request = new Request('http://localhost:3301/')

const get = async (req, res) => {
    try {
        const answer = await request.get()
        return new Response({
            res,
            message: answer.data
        }).send()
    } catch (error) {
        return new Response({
            res,
            status: 500,
            message: error.message
        }).send()
    }
}

module.exports = {
    get
}
