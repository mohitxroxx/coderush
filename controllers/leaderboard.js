const express=require('express')
const leaderboard=require('../models/leaderboard')
const axios=require('axios')
const removedteam = require('../models/removedteam')

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

        const func=async () => {  
        try{
            const res= await axios.get('https://www.hackerrank.com/rest/contests/eniac23-wildcard/leaderboard?offset=0&limit=100&_=1700119232836',{
                headers:{
                'User-Agent':'PostmanRuntime/7.35.0',
            }} );
              
            const apiData=res.data.models
            if((await leaderboard.find()).length==0){
            await leaderboard.insertMany(apiData);
            console.log("data inserted");
        }
       else{
        (apiData).map(async (e)=>{
        let alreadyauser=await leaderboard.find({hacker_id:e.hacker_id});
        if(alreadyauser.length==0){
            leaderboard.insertMany([e]);
        }
        else{
        await leaderboard.findOneAndReplace( {hacker_id: e.hacker_id},e);
        }
       });
       console.log("data updated");
       }
        }
        catch(error){
            console.error('Error occured')
            console.log(error);
        }
    }
    setInterval(func, 6000);
    func()
}

module.exports.delTeam=async(req,res)=>{
    const {time,team} =req.body;
    const func=async ()=>{
    let alreadydeleteteams=await removedteam.find();
    let totalteam= await leaderboard.find();
    let current=[];
    for(let i=0;i<totalteam.length;i++){
        let r=0;
        for(let y=0;y<alreadydeleteteams.length;y++){
            if(alreadydeleteteams[y].hacker_id==totalteam[i].hacker_id){
                r++;
                break;
            }      
        }
        if(r==0){
            current.push(totalteam[i])
        }
     }
     current.sort((a,b)=>{ return (parseInt(b.rank)-parseInt(a.rank))});
     let ans=current.splice(0,parseInt(team));
     console.log(ans);
    await removedteam.insertMany(ans);
}
    setTimeout(func,time*1000);
    func()
}
module.exports.currentTeams=async(req,res)=>{
   let Teams= await leaderboard.find();
   let del= await removedteam.find();
   let current=[];
 for(let i=0;i<Teams.length;i++){
    let r=0;
    for(let y=0;y<del.length;y++){
        if(del[y].hacker_id==Teams[i].hacker_id){
            r++;
            break;
        }      
    }
    if(r==0){
        current.push(Teams[i]);
    }
 }
   res.send(current);
}
module.exports.deletedTeams=async(req,res)=>{
    let deletedteam=await removedteam.find();
    res.send(deletedteam);
}

