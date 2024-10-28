const express = require('express')
const blackList = require('../controllers/BlackListController.js')
const {verifyToken} = require('../controllers/userController.js')

const Router = express.Router()


Router.get('/allblacklists', verifyToken, blackList.getAllBlackLists)
Router.post('/newblacklist', verifyToken, blackList.newBlackList)


module.exports = Router