const express=require('express')
const connectDB=require('./config/db')
const routes=require('./routes/routes')
const cors=require('cors')

connectDB()
const app=express()
app.use(cors())
app.use(express.json())

app.use('/api',routes)

const PORT=process.env.PORT
app.listen(PORT,console.log("Server up and running at",PORT))