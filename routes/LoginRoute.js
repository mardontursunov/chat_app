const router = require('express').Router()
let users = require('../data')
const { confirmHash } = require('../modules/bcrypt')
const { generateToken } = require('../modules/jwt')

router.get('/', (req, res) => {
    res.render('login', {
        title: "Login",
        path: "/login",
        error: ""
    })
})

router.post('/', async (req, res) => {
    try {
        let {email, password} = req.body
        if(!(email && password)) throw new Error('Email or Password is incorrect!')
        let user = findUser(email)
        if(!user) throw new Error("This email is not found!")
        let isTrust = await confirmHash(password, user.password)
        if(!isTrust) throw new Error("Password is incorrect!")
        let user_data = {user: user.id}
        let token = generateToken(user_data)
        res.cookie('token', token).redirect('/')
    }
    catch (e) {
        res.render('login', {
            title: "Login",
            path: '/login',
            error: e + ''
        })
    }
})

module.exports = {
    path: '/login',
    router: router
}

function findUser (email) {
    return users.find(user => user.email == email)
}