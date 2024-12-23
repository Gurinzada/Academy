const express = require('express')
const {verifyToken} = require('../controllers/userController.js')
const {dynamicAnalysis,executionTime,logRequestHeaders} = require('../controllers/ControllerMiddlaware.js')
const aprovelist = require('../controllers/approveListController.js')

const Router = express.Router()

Router.get('/toapprove', executionTime, dynamicAnalysis, logRequestHeaders, verifyToken, aprovelist.getListToApprove)
Router.delete('/approvedornot/:id',  executionTime, dynamicAnalysis, logRequestHeaders, verifyToken, aprovelist.approvedOrNotClass )
Router.post('/sendapprove',  executionTime, dynamicAnalysis, logRequestHeaders, verifyToken,aprovelist.checkApproveDays, aprovelist.forApprove)

module.exports = Router