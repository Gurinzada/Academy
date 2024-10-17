const express = require('express')
const admin = require('../controllers/AdminController.js')

const Router = express.Router()

Router.post('/adminlogin', admin.LoginAdmin)

module.exports = Router