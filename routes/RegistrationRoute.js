const router = require('express').Router()
let users = require('../data')

const { generateHash } = require('../modules/bcrypt')

router.get('/', (req, res) => {
    res.render('registration', {
        title: "Registration",
        path: "/registration",
        error: ""
    })
})

router.post('/', async (req, res) => {
    try {
        let {email, name, password} = req.body
        console.log(req.body);
        if(!(email && name && password)) throw new Error("Field isn't completed!")
        if(findUser(email)) throw new Error("This email is already in use!")

        users.push({
            id: users.length + 1 , name, email, password: await generateHash(password)
        })
        res.redirect('/login')
    } 
    catch(e) {
        res.render('registration', {
            title: "Registration",
            path: '/registration',
            error: e + ''
        })
    }
})


module.exports = {
    path: '/registration',
    router: router
}

function findUser (email) {
    return users.find(user => user.email == email)
}