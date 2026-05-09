const express = require('express')
const cors = require('cors')
const dbConnect = require('./dbConnect')

const app = express()

app.use(cors())
app.use(express.json())

const itemsRoute = require('./routes/itemsRoute')
const usersRoute = require('./routes/userRoute')
app.use('/api/items/', itemsRoute)
app.use('/api/users/', usersRoute)

const port = 5000

app.get('/', (req, res) => res.send('Hello World! from home api'))
app.listen(port, () => console.log(`Node JS Server Running port ${port}!`))