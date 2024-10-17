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


module.exports = {LoginAdmin}