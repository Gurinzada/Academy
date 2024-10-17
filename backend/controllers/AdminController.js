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
        const role = Number(req.headers['x-role'])
        if(role !== 1 || !role) return res.status(403).json("You must provide an role")
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

const deleteAnUser = async(req, res) => {
    const {id} = req.params
    const role = Number(req.headers['x-role'])
        if(role !== 1 || !role) return res.status(403).json("You must provide an role")
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
        res.status(500).json({message: "Server Error"})
    }
}


module.exports = {LoginAdmin, getAllUsers, deleteAnUser}