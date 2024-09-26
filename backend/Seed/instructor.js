const prisma = require("../config/prisma")
const bcrypt = require('bcrypt')

const seedInstructors = async() => {
    try {
        let salt = 10
        const newSalt = await bcrypt.genSalt(salt)
        const response = await prisma.professor.createMany({
            data:[
                {
                    name: "Lucas",
                    lastname: "Silva",
                    email: "lucas.silva@email.com",
                    password: await bcrypt.hash("password123", newSalt),
                    roleid: 3
                  },
                  {
                    name: "Mariana",
                    lastname: "Costa",
                    email: "mariana.costa@email.com",
                    password: await bcrypt.hash("passmariana", newSalt),
                    roleid: 3
                  },
                  {
                    name: "Felipe",
                    lastname: "Gomes",
                    email: "felipe.gomes@email.com",
                    password: await bcrypt.hash("felipe789", newSalt),
                    roleid: 3
                  },
                  {
                    name: "Ana",
                    lastname: "Moura",
                    email: "ana.moura@email.com",
                    password: await bcrypt.hash("anapass456", newSalt),
                    roleid: 3
                  },
                  {
                    name: "João",
                    lastname: "Ferreira",
                    email: "joao.ferreira@email.com",
                    password: await bcrypt.hash("joaopassword", newSalt),
                    roleid: 3
                  },
                  {
                    name: "Bruna",
                    lastname: "Lima",
                    email: "bruna.lima@email.com",
                    password: await bcrypt.hash("brunapass222", newSalt),
                    roleid: 3
                  },
                  {
                    name: "Gustavo",
                    lastname: "Alves",
                    email: "gustavo.alves@email.com",
                    password: await bcrypt.hash("gustavo001", newSalt),
                    roleid: 3
                  },
                  {
                    name: "Fernanda",
                    lastname: "Pereira",
                    email: "fernanda.pereira@email.com",
                    password: await bcrypt.hash("fernanda007", newSalt),
                    roleid: 3
                  }
            ]
        })
        if(response){
            console.log("Finish")
        }
    } catch (error) {
        console.log(error)
    }
}

seedInstructors()