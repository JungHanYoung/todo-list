const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 4000

const io = require('socket.io').listen(app.listen(port, () => console.log(`server is running on ${port}`)));

io.sockets.on('connection', (socket) => {
    console.log('client user connected')
})

app.use((req, res, next) => {
    req.io = io
    next()
})

const dbusername = process.env.DB_USERNAME || "8735132"
const dbpassword = process.env.DB_PASSWORD || "nej5968"

mongoose.connection.on('error', console.error)
mongoose.connection.once('open', () => {
    console.log('Connected to mongodb server')
})
mongoose.connect(`mongodb://${dbusername}:${dbpassword}@ds147304.mlab.com:47304/todolist`, {
    useNewUrlParser: true
})

app.use(cors('http://localhost:3000'))

app.use(session({
    secret: process.env.SESSION_SECRET_KEY || 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}))

app.use(morgan('dev'))
app.use(express.json())

const api = require('./routes')

app.use('/api', api)
