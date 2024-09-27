const prisma = require('../config/prisma')

const newClass = async (req, res) => {
    try {
        const {weekDay, hours, professorid} = req.body
        const response = await prisma.aulas.create({
            data:{
                dia: weekDay,
                horario: hours,
                idaluno: req.userid,
                idprofessor: professorid
            }
        })
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(200).json({message: `Server error`})
    }
}

const getUserClass = async (req, res) => {
    try {
        const response = await prisma.aulas.findMany({
            where:{
                idaluno: req.userid
            }
        })
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json({message: `Server error`})
    }
}


module.exports = {getUserClass, newClass}