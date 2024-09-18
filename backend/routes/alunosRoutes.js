const express = require('express')
const alunosController = require('../controllers/alunosController.js')

const router = express.Router()

router.post("/newuser", alunosController.newUser)
router.post("/login", alunosController.login)

module.exports = router