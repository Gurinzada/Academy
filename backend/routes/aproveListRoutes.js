const express = require('express')
const {verifyToken} = require('../controllers/userController.js')
const {dynamicAnalysis,executionTime,logRequestHeaders} = require('../controllers/ControllerMiddlaware.js')
const aprovelist = require('../controllers/approveListController.js')

const Router = express.Router()

Router.get('/toapprove', executionTime, dynamicAnalysis, logRequestHeaders, verifyToken, aprovelist.getListToApprove)
Router.delete('/approved/:id',  executionTime, dynamicAnalysis, logRequestHeaders, verifyToken, aprovelist.approvedClass )
Router.post('/sendapprove',  executionTime, dynamicAnalysis, logRequestHeaders, verifyToken, aprovelist.forApprove)

module.exports = Router