const express = require('express')
const cors = require('cors')
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


app.listen(3000, () => {
    console.log(`We're listen to the port 3000`)
})

app.use('/api', routerUser)
app.use('/api', routerClasses)
app.use('/api', routerApproveList)