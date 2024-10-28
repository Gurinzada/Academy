const prisma = require('../config/prisma.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const LoginAdmin = async(req, res) => {
    try {
        const {password, email} = req.body

        const checkEmail = await prisma.aluno.findUnique({
            where:{
                email:email
            }
        })

        if(!checkEmail || Number(checkEmail.roleid) !== 1) return res.status(404).json(`Email or password incorrect`)
        
            const checkPassword = await bcrypt.compare(password, checkEmail.password)

            if(!checkPassword) return res.status(404).json(`Email or password incorrect`)

                const token = jwt.sign({userid: checkEmail.id}, process.env.SECRET, {expiresIn: 86400})
                return res.status(200).json({token, auth:true, role:checkEmail.roleid}) 
    } catch {
        return res.status(500).json({message: "Server error"})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const response = await prisma.aluno.findMany({
            where:{
                NOT:{
                    id:req.userid
                }
            }
        })
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json({message: "Server Error"})
    }
}

const getAllInstructos = async (req, res) => {
    try {
        const response = await prisma.professor.findMany()
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json({message: "Error Server"})
    }
}

const deleteAnUser = async(req, res) => {
    const {id} = req.params
    try {
        const response = await prisma.aluno.delete({
            where:{
                id: id
            }
        })
        if(response){
            return res.status(200).json({...response, deleted: true})
        }
    } catch {
        return res.status(500).json({message: "Server Error"})
    }
}

const updateAnUser = async(req, res) => {
    const {id} = req.params
    const {password} = req.body
    let salt = 10
    const newSalt = await bcrypt.genSalt(salt)
    const hashPassword = await bcrypt.hash(password, newSalt)
    password = hashPassword
    try {
        const response = await prisma.aluno.update({
            where:{
                id: id
            },
            data:{
                password: password
            }
        })

        if(response){
            return res.status(200).json({updated: true, ...response})
        }
    } catch {
        return res.status(500).json({message: "Server Error"})
    }
}

const getAllClasses = async(req, res) => {
    try {
        const response = await prisma.aulas.findMany()
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json({message:"Server Error"})
    }
}

const checkRoleAdmin = async(req, res, next) => {
    try {
        const role = req.headers['x-role']
        if(!role || Number(role) !== 1) return res.status(403).json(`You need to provide a token`)

            next()

    } catch {
        return res.status(500).json({message:`Server error`})
    }
}


module.exports = {LoginAdmin, getAllUsers, deleteAnUser, getAllInstructos, updateAnUser, checkRoleAdmin, getAllClasses}