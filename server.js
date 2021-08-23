const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

// Requires
const fs = require('fs')
const path = require('path')

// Config
require('dotenv').config()
const PORT = process.env.PORT

// Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Settings
app.set('view engine', 'ejs')

// Route setting
const routePath = path.join(__dirname, 'routes')
fs.readdir(routePath, (err, data) => {
    data.forEach(routeFile => {
        let route = require('./routes/' + routeFile)
        if(route){
            app.use(route.path, route.router)
        }
    })
})


app.listen(PORT, () => console.log("Server is running on *" +  PORT))