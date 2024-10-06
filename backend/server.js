const express = require('express')
const cors = require('cors')
require('dotenv').config()
// const socketIo  = require('socket.io')
// const http = require('http')
// const prisma = require('./config/prisma.js')
const routerUser = require('./routes/userRoutes.js')
const routerClasses = require('./routes/classesRoutes.js')
const routerApproveList = require('./routes/aproveListRoutes.js')


const app = express()



app.use(express.json())
app.use(cors({
    methods:[
        "GET", "POST", "PUT", "PATCH", "DELETE"
    ],
    optionsSuccessStatus: 200
}))

const port = process.env.PORT || 3000




app.listen(port, () => {
    console.log(`We're listen to the port ${port}`)
})

app.use('/api', routerUser)
app.use('/api', routerClasses)
app.use('/api', routerApproveList)