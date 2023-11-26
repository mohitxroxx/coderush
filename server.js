const express=require('express')
const connectDB=require('./config/db')
const routes=require('./routes/routes')

connectDB()
const app=express()
app.use(express.json())

app.use('/api',routes)

const PORT=process.env.PORT
app.listen(PORT,console.log("Server up and running at",PORT))