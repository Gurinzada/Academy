const prisma = require("../config/prisma")


const seedInstructors = async() => {
    try {
        const response = await prisma.professor.createMany({
            data:[
                {
                    name: "Lucas",
                    lastname: "Silva",
                    email: "lucas.silva@email.com",
                    password: "password123",
                    roleid: 3
                  },
                  {
                    name: "Mariana",
                    lastname: "Costa",
                    email: "mariana.costa@email.com",
                    password: "passmariana",
                    roleid: 3
                  },
                  {
                    name: "Felipe",
                    lastname: "Gomes",
                    email: "felipe.gomes@email.com",
                    password: "felipe789",
                    roleid: 3
                  },
                  {
                    name: "Ana",
                    lastname: "Moura",
                    email: "ana.moura@email.com",
                    password: "anapass456",
                    roleid: 3
                  },
                  {
                    name: "João",
                    lastname: "Ferreira",
                    email: "joao.ferreira@email.com",
                    password: "joaopassword",
                    roleid: 3
                  },
                  {
                    name: "Bruna",
                    lastname: "Lima",
                    email: "bruna.lima@email.com",
                    password: "brunapass222",
                    roleid: 3
                  },
                  {
                    name: "Gustavo",
                    lastname: "Alves",
                    email: "gustavo.alves@email.com",
                    password: "gustavo001",
                    roleid: 3
                  },
                  {
                    name: "Fernanda",
                    lastname: "Pereira",
                    email: "fernanda.pereira@email.com",
                    password: "fernanda007",
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