const express=require('express')
const router=express.Router()
const {login,leaderboard,delTime,delTeam,currentTeams,deletedTeams}=require('../controllers/leaderboard')

router.post('/login',login)
router.get('/leaderboard',leaderboard)
// router.post('/addtime',delTime)
// router.post('/removeteam',delTeam)
// router.get('/current',currentTeams)
// router.get('/deleted',deletedTeams)

module.exports=router