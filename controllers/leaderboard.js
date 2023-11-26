const express=require('express')
const leaderboard=require('../models/leaderboard')
const axios=require('axios')
const connectDB=require('../config/db')

connectDB()
// const bodyParser=require('body-parser')

const app=express()
// app.use(bodyParser.json())

const users={
    'bdcoe1':'bdcoe_1',
    'bdcoe2':'bdcoe_2',
    'bdcoe3':'bdcoe_3',
    'bdcoe4':'bdcoe_4',
    'bdcoe5':'bdcoe_5'
}

module.exports.login=(req,res,next)=>{
    const{user,pass}=req.body
    if(users[user] && users[user] == pass)
    res.json({success:true,message:'Login Successful'})
    else
    res.json({success:false,message:'Invalid credentials'})
}

module.exports.leaderboard=async()=>{
    const call=async()=>{
        // console.log('hi')
        try{
                const chk=await leaderboard.find()
                if(chk>0){
                    await leaderboard.deleteMany()
                    console.log('data removed')
                }
                const res = await axios.get('https://www.hackerrank.com/rest/contests/eniac23-wildcard/leaderboard?offset=0&limit=2&_=1700119232836', {
                  headers: {
                    'User-Agent': 'PostmanRuntime/7.35.0',
                  },
                })
                const data = res.data.models
                await leaderboard.insertMany(data)
                console.log(data)
                // leaderboard.save() 
            }
        catch{
            console.log('error')
        }
        setTimeout(call, 60000)
    }
    call() 
}

