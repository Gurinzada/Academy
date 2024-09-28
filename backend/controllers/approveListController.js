const prisma = require('../config/prisma.js')


const forApprove = async (req, res) => {
    try {
        const {weekDay, hours, professorid} = req.body
        const response = await prisma.aprovelist.create({
            data:{
                dia:weekDay,
                horario:hours,
                idprofessor:professorid,
                idaluno: req.userid
            }
        })
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json({message:`Server error`})
    }
}

const approvedClass = async(req,res) => {
    try {
        const {id} = req.params
        const response = await prisma.aprovelist.delete({
            where:{
                id:id
            }
        })
        if(response){
            return res.status(200).json({...response, approved:true})
        } 
    } catch  {
        return res.status(500).json({message:`Server error`})
    }
}

const getListToApprove = async(req,res) => {
    try {
        const response = await prisma.aprovelist.findMany({
            where:{
                idprofessor: req.userid
            }
        })
        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json({message:`Server error`})
    }
}


module.exports = {forApprove, approvedClass, getListToApprove}