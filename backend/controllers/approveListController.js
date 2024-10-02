const prisma = require('../config/prisma.js')


const checkApproveDays = async(req,res, next) => {
    try {
        const {weekDay} = req.body
        console.log(weekDay)
        const response = await prisma.aprovelist.findMany({
            where:{
                idaluno:req.userid
            }
        })
        const responseClasses = await prisma.aulas.findMany({
            where:{
                idaluno: req.userid
            }
        })
        if(response.length === 0 && responseClasses.length === 0){
            next()
        }
        const findEqual = response.find((element) => element.dia === weekDay)
        const findEqualClasses = responseClasses.find((element) => element.dia === weekDay)
        if(findEqual || findEqualClasses){
            return res.status(403).json({message:"Not allowed"})
        }
        next()
    } catch {
        return res.status(500).json({message:"Server error!"})
    }
}

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

const approvedOrNotClass = async(req,res) => {
    try {
        const {id} = req.params
        console.log(id)
        const response = await prisma.aprovelist.delete({
            where:{
                id:Number(id)
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
       const role = req.headers["x-role"]
       const roleNumber = Number(role)
       if(roleNumber === 2){
        const response = await prisma.aprovelist.findMany({
            where:{
                idaluno:req.userid
            }
        })
        if(response){
            return res.status(200).json(response)
        }
       }else if(roleNumber === 3){
        const response = await prisma.aprovelist.findMany({
            where:{
                idprofessor: req.userid
            }
        })
        if(response){
            return res.status(200).json(response)
        }
       }
    } catch {
        return res.status(500).json({message:`Server error`})
    }
}



module.exports = {forApprove, approvedOrNotClass,checkApproveDays, getListToApprove}