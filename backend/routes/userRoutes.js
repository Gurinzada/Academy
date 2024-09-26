const express = require('express')
const userController = require('../controllers/userController.js')
const controllerMiddle = require('../controllers/ControllerMiddlaware.js')

const router = express.Router()

router.post("/newuser", controllerMiddle.executionTime, controllerMiddle.dynamicAnalysis, userController.newUser)
router.post("/loginuser",  controllerMiddle.executionTime, controllerMiddle.dynamicAnalysis, userController.login)
router.post('/logininstructor', controllerMiddle.executionTime, controllerMiddle.dynamicAnalysis, userController.loginInstructor)
router.get('/userinfo',  controllerMiddle.executionTime, controllerMiddle.dynamicAnalysis, userController.verifyToken, userController.getUserInfo)


//Uso para testes
router.get('/all',  controllerMiddle.executionTime, controllerMiddle.dynamicAnalysis, controllerMiddle.executionTime, controllerMiddle.dynamicAnalysis,userController.getAllUsers)
router.get('/professor/:id', controllerMiddle.executionTime, controllerMiddle.dynamicAnalysis, userController.getUserById)

module.exports = router