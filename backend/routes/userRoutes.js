const express = require('express')
const userController = require('../controllers/userController.js')

const router = express.Router()

router.post("/newuser", userController.newUser)
router.post("/loginuser", userController.login)
router.post('/logininstructor', userController.loginInstructor)
router.get('/all', userController.getAllUsers)
router.get('/userinfo', userController.verifyToken, userController.getUserInfo)

module.exports = router