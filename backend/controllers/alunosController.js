const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const prisma = require('../config/prisma')
const { log } = require('console')
require('dotenv').config()


const newUser = async(req,res) =>{
    try {
        let salt = 10
        const {name, lastname,email, roleid} = req.body
        let {password} = req.body

        const newsalt = await bcrypt.genSalt(salt)
        const newHash = await bcrypt.hash(password, newsalt)
        password = newHash

        const response = await prisma.aluno.create({
            data:{
                email,
                name,
                lastname,
                password,
                roleid
            }
        })

        if(response){
            return res.status(200).json(response)
        }
    } catch {
        res.status(500).json(`Error server`)
    }
}

const login  = async(req, res) => {
    try {
        const {email, password} = req.body

        const checkEmail = await prisma.aluno.findUnique({
            where:{
                email:email
            }
        })

        if(!checkEmail){
            res.status(404).json(`Email or Password incorrect`)
        }

        const checkPassword = await bcrypt.compare(password, checkEmail.password)

        if(!checkPassword){
            res.status(404).json(`Email or Password incorrect`)
        }

        const token = jwt.sign({alunoid: checkEmail.email}, process.env.SECRET, {expiresIn: 86400})
        res.status(200).json({token, auth: true})
    } catch {
        res.status(500).json(`Error server`)
    }
}

module.exports = {login, newUser}