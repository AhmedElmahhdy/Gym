import express from 'express'
import connection from './DB/dbconnection.js'
import trainerRoutes from './src/Modules/Trainer/trainer_routes.js'
import memberRoutes from './src/Modules/Member/member_routes.js'
const app = express()
const port = 3000

connection
app.use(express.json())
app.use('/members',memberRoutes)
app.use('/trainers',trainerRoutes)

app.listen(port,console.log("server is created at",port))