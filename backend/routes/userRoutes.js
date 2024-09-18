const express = require('express')
const userController = require('../controllers/userController.js')

const router = express.Router()

router.post("/newuser", userController.newUser)
router.post("/loginuser", userController.login)
router.get('/userinfo', userController.verifyToken, userController.getUserInfo)
router.get('/all', userController.getAllUsers)

module.exports = router