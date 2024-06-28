const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

//const mongoUrl = 'mongodb+srv://akseliforma:safeahhpassword@cluster0.fhp6vln.mongodb.net/blogApp?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app