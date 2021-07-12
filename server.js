const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')


app.use(morgan("dev"))
app.use(express.json())

mongoose.connect(
    'mongodb+srv://violinist1225:NovemberL946!@cluster0.8gjpq.mongodb.net/rock-the-vote',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    () => console.log('Connected to the DB')
  )
  app.use('/auth', require('./routes/authRouter.js'))
  app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']})) // req.user
  app.use('/api/issue', require('./routes/issueRouter.js'))
  app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
  })
  app.listen(9000, () => {
    console.log(`Server is running on local port 9000`)
  })