const router = require('express').Router()

router.get('/contacts', (req, res) => {
    res.render('contacts', {
        title: "Contacts Page",
        path: '/contacts'
    })
})

module.exports = {
    path: '/',
    router: router
}
