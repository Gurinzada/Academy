const express = require('express')
const blackList = require('../controllers/BlackListController.js')
const {verifyToken} = require('../controllers/userController.js')
const {checkRoleAdmin} = require('../controllers/AdminController.js')

const Router = express.Router()


Router.get('/allblacklists', verifyToken, checkRoleAdmin, blackList.getAllBlackLists)
Router.post('/newblacklist', verifyToken, checkRoleAdmin, blackList.newBlackList)


module.exports = Router