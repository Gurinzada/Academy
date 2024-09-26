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
        return res.status(500).json(`Error server`)
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
            return res.status(404).json(`Email or Password incorrect`)
        }

        const checkPassword = await bcrypt.compare(password, checkEmail.password)

        if(!checkPassword){
           return res.status(404).json(`Email or Password incorrect`)
        }

        const token = jwt.sign({userid: checkEmail.id}, process.env.SECRET, {expiresIn: 86400})
        return res.status(200).json({token, auth: true, role: checkEmail.roleid})
    } catch {
        return res.status(500).json(`Error server`)
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
            return res.status(404).json(`Email or Password incorrect`)
        }

        const token = jwt.sign({userid: checkEmail.id}, process.env.SECRET, {expiresIn: 86400})
        return res.status(200).json({token, auth:true, role: checkEmail.roleid})
    } catch {
        return res.status(500).json(`Error server`)
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if(!token){
            res.status(401).json({auth:false, message:"Token not exist"})
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) return err
            req.userid = decoded.userid
            // console.log(decoded.iat)
        next()
        })
        
    } catch {
        return res.status(403).json(`Token Expires`)
    }
}

const getUserInfo = async (req, res) => {
    try {
        const role = req.headers['x-role']
        if(Number(role) === 2){
            const response = await prisma.aluno.findUnique({
                where:{
                    id: req.userid
                }
            })
            if(response){
                return res.status(200).json({email:response.email, name:response.name, lastname: response.lastname})
            }
        } else if(Number(role) === 3){
            const response = await prisma.professor.findUnique({
                where:{
                    id:req.userid
                }
            })

            if(response){
                return res.status(200).json({email: response.email, name: response.name, lastname:response.lastname})
            }
        }
        

    } catch {
        return res.status(500).json(`Server error`)
    }
}



const getAllUsers = async (req, res) => {
    try {
        const response = await prisma.aluno.findMany()
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json(`Server Error`)
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const response = await prisma.professor.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json({message: `Server error`})
    }
}

module.exports = {login, newUser, verifyToken, getUserInfo, getAllUsers, loginInstructor,getUserById}