const router = require('express').Router()
const { verifyToken } = require('../modules/jwt')
let users = require('../data')

router.get('/', (req, res) => {
    let user;
    if(req.cookies.token){
        user = verifyToken(req.cookies.token)   
    }
    if(user) {
        user = users.find(user2 => user2.id == user.user)
    }
    res.render('index', {
        title: "Home Page",
        path: "/",
        user: {
            name: user?.name || "", 
            email: user?.email || ""
        }
    })
})

module.exports = {
    path: '/',
    router: router
}