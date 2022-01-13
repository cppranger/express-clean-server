const Response = require('../../util/Response/Response')

const get = async (req, res) => {
    try {
        return new Response({
            res,
            status: 418,
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
