const prisma = require("../config/prisma")


const SeedRoles = async() => {
    try {
        const response = await prisma.role.createMany({
            data:[
                {
                    namerole:"admin"
                },
                {
                    namerole:"aluno"
                },
                {
                    namerole: "professor"
                }
            ]
        })

        if(response){
            return console.log(`Seed completo!`)
        }
    } catch (error) {
        console.log(error)
    }
}

SeedRoles()