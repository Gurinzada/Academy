const prisma = require('../config/prisma.js')
const bcrypt = require('bcrypt')

const seedMyUser = async () => {
    try {
        let salt = 10
        const theSalt = await bcrypt.genSalt(salt)
        const response = await prisma.aluno.create({
            data:{
                name:"Admin",
                lastname:"Admin",
                password: await bcrypt.hash('Odeiosenha123?', theSalt),
                email: "adminadminamin@admin.com",
                roleid: 1

            }
        })
        if(response){
            console.log(`OK`)
        }
    } catch (error) {
        console.log({error: "ERRADO"})
    }
}

seedMyUser()