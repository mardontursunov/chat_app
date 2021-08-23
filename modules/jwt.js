const JWT = require('jsonwebtoken')
require('dotenv').config()
let secret_word = process.env.SECRET_WORD

function generateToken (data) {
    return JWT.sign(data, secret_word)
}


function verifyToken (data) {
    try {
        let result = JWT.verify(data, secret_word)
        return result
    } catch (e) {
        return false
    }
}

module.exports = {
    generateToken,
    verifyToken
}
