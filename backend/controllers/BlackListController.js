const prisma = require('../config/prisma.js')


const newBlackList = async(req,res) => {
    const {email} = req.body
    const role = req.headers['x-role']
    if(Number(role) !== 1) return res.status(403).json(`You must provide an role`)
    try {
        const response = await prisma.blackList.create({
            data:{
                email: email,
                date: new Date()
            }
        })

        if(response){
            return res.status(200).json(response)
        }
    } catch {
        return res.status(500).json({message: "Server error"})
    }
}

const getAllBlackLists = async(req, res) => {
    const role = req.headers['x-role']
    if(Number(role) !== 1) return res.status(403).json(`You must provide an role`)
    try {
        const response = await prisma.blackList.findMany()
        if(response){
            return res.status(200).json({lengthBlackList: response.length})
        }
    } catch {
        return res.status(500).json({message: "Server error"})
    }
}

module.exports = {getAllBlackLists, newBlackList}