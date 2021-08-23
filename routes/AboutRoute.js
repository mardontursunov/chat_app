const router = require('express').Router()

router.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        path: "/about"
    })
})

module.exports = {
    path: '/',
    router: router
}
