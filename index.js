const express=require("express")
const connectDb=require("./configdb/db")
const user=require('./routes/userroutes')
const cors = require("cors")



const app=express()
app.use(cors())

app.use(express.json()) 

require('dotenv').config()
connectDb()



app.use("/api/user",user)

const PORT=3001

app.listen(PORT,(req,res)=>
{
    console.log(`The  Posrt is connected succefully at ${PORT}`)
})

