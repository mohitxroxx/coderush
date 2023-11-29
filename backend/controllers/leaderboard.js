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
const func=async () => {  
    try{
        const res= await axios.get(process.env.API,{
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
// function ultimatesorting(a,b){
//     if (a.score < b.score) {
//         return 1; // b comes first
//       } else if (a.score > b.score) {
//         return -1; // a comes first
//       } else {
//         // If scores are equal, compare by time
//         if (a.time_taken < b.time_taken) {
//           return -1; // a comes first
//         } else if (a.time_taken > b.time_taken) {
//           return 1; // b comes first
//         } else {
//           return 0; // no change in order
//         }
//       }
// }

module.exports.login=(req,res,next)=>{
    const{user,pass}=req.body
    if(users[user] && users[user] == pass)
    res.json({success:true,message:'Login Successful'})
    else
    res.json({success:false,message:'Invalid credentials'})
}

module.exports.leaderboard=async(req,res)=>{
    let inte=  setInterval(func, 10000);
    res.send("hello");
    return ()=>clearInterval(inte);
}

module.exports.delTeam=async(req,res)=>{
    const {time,team,user,pass} =req.body;
    if(users[user] && users[user] == pass){
        const func=async ()=>{
        let alreadydeleteteams=await removedteam.find();
        let totalteam= await leaderboard.find();
        let current=[];
        if(totalteam-team<5)   {
            return;
        }
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
         current.sort((a,b)=>{return (a.score-b.score|| b.time_taken-a.time_taken)});
         let ans=current.splice(0,parseInt(team));
         console.log("removed teams=",team);
        await removedteam.insertMany(ans);
    }
    const interval = setInterval(() => func(),time*60000);
    return ()=>clearInterval(interval);
    // func()
}
    else{
    res.json({success:false,message:'Hack nhi ho ne wala bro'})
    }
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
 current.sort((a,b)=>{
    b.score - a.score || a.time_taken - b.time_taken
 });
    
 console.log(current);
   res.send(current);
}
module.exports.deletedTeams=async(req,res)=>{
    let deletedteam=await removedteam.find().sort({
        updatedAt:-1,
    });
    console.log(deletedteam);
    res.send(deletedteam);
    
}


