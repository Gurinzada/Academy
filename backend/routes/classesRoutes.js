const express = require('express')
const classesController = require('../controllers/classesController.js')
const userController = require ('../controllers/userController.js')
const middle = require('../controllers/ControllerMiddlaware.js')

const Router = express.Router()

Router.post('/newclass', middle.executionTime, 
    middle.dynamicAnalysis, middle.logRequestHeaders, 
    userController.verifyToken, classesController.newClass)

Router.get('/getuserclass', middle.executionTime, 
    middle.dynamicAnalysis, middle.logRequestHeaders, 
    userController.verifyToken, classesController.getUserClass)



module.exports = Router