const express = require('express')
const admin = require('../controllers/AdminController.js')
const {verifyToken} = require('../controllers/userController.js')

const Router = express.Router()

Router.post('/adminlogin', admin.LoginAdmin)
Router.get('/adminalluser', verifyToken, admin.LoginAdmin)
Router.delete('/deleteuser', verifyToken, admin.deleteAnUser)

module.exports = Router