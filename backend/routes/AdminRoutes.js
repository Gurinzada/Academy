const express = require('express')
const admin = require('../controllers/AdminController.js')
const {verifyToken} = require('../controllers/userController.js')

const Router = express.Router()

Router.post('/adminlogin', admin.LoginAdmin)
Router.get('/adminalluser', verifyToken, admin.checkRoleAdmin, admin.getAllUsers)
Router.delete('/deleteuser/:id', verifyToken, admin.checkRoleAdmin, admin.deleteAnUser)
Router.get('/admininstructors', verifyToken, admin.checkRoleAdmin, admin.getAllInstructos)
Router.patch('/adminupdateuser/:id', verifyToken,admin.checkRoleAdmin,  admin.updateAnUser)
Router.get('/adminAllClasses', verifyToken, admin.checkRoleAdmin, admin.getAllClasses)
Router.get('/admin/userstudent/:id', verifyToken, admin.checkRoleAdmin, admin.getAnUserById)


module.exports = Router