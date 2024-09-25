const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const prisma = require('../config/prisma')
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
                email: email,
                name: name,
                lastname: lastname,
                password: password,
                roleid: roleid
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

        const token = jwt.sign({userid: checkEmail.id}, process.env.SECRET, {expiresIn: 86400})
        res.status(200).json({token, auth: true, role: checkEmail.roleid})
    } catch {
        res.status(500).json(`Error server`)
    }
}

const loginInstructor = async (req, res) => {
    try {
        const {email, password} = req.body

        const checkEmail = await prisma.professor.findUnique({
            where:{
                email: email
            }
        })

        if(!checkEmail){
            res.status(404).json(`Email or Password incorrect`)
        }

        const checkPassword = await bcrypt.compare(password, checkEmail.password)
        if(!checkPassword){
            res.status(404).json(`Email or Password incorrect`)
        }

        const token = jwt.sign({userid: checkEmail.id}, process.env.SECRET, {expiresIn: 86400})
        res.status(200).json({token, auth:true, role: checkEmail.roleid})
    } catch {
        res.status(500).json(`Error server`)
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if(!token){
            res.status(401).json({auth:false, message:"Token not exist"})
        }

        const decoded = jwt.verify(token, process.env.SECRET)
        req.userid = decoded
        next()
    } catch {
        res.status(403).json(`Token Expires`)
    }
}

const getUserInfo = async (req, res) => {
    try {
        const role = req.headers['x-role']
        if(role === 2){
            const response = await prisma.aluno.findUnique({
                where:{
                    id: req.userid
                }
            })
    
            if(response){
                res.status(200).json({email:response.email, name:response.name, lastname: response.lastname})
            }
        } else if(role === 3){
            const response = await prisma.professor.findUnique({
                where:{
                    id:req.userid
                }
            })

            if(response){
                res.status(200).json({email: response.email, name: response.name, lastname:response.lastname})
            }
        }
        

    } catch {
        res.status(500).json(`Server error`)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const response = await prisma.aluno.findMany()
        if(response){
            res.status(200).json(response)
        }
    } catch {
        res.status(500).json(`Server Error`)
    }
}

module.exports = {login, newUser, verifyToken, getUserInfo, getAllUsers, loginInstructor}