const prisma = require('../config/prisma')

const newClass = async (req, res) => {
    try {
        const {weekDay, hours, idaluno} = req.body
        const response = await prisma.aulas.create({
            data:{
                dia: weekDay,
                horario: hours,
                idaluno: idaluno,
                idprofessor: req.userid
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
        const role = req.headers[('x-role')]
        if(Number(role) === 2){
            const response = await prisma.aulas.findMany({
                where:{
                    idaluno: req.userid
                }
            })
            if(response){
                return res.status(200).json(response)
            }
        } else if(Number(role) === 3){
            const response = await prisma.aulas.findMany({
                where:{
                    idprofessor: req.userid
                }
            })
            if(response){
                return res.status(200).json(response)
            }
        }
        
    } catch(error) {
        console.log(error)
        return res.status(500).json({message: `Server error`})
    }
}


module.exports = {getUserClass, newClass}