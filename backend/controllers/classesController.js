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

const checkUserClasses = async (req, res, next) => {
    try {
        const {weekDay} = req.body
        const response = await prisma.aulas.findMany({
            where:{
                idaluno: req.userid
            }
        })
        if(response.length === 0){
            next()
        }

        const findEqual = response.find((element) => element.dia === weekDay)
        if(findEqual){
           return res.status(403).json({message: `Not allowed`})
        }
        next()

    } catch {
        return res.status(500).json({message: `Server error`})
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


module.exports = {getUserClass, newClass, checkUserClasses}