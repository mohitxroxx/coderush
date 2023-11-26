const mongoose = require("mongoose")

const leaderboard = new mongoose.Schema({
    hacker_id: Number,
    rank: Number,
    score: Number,
    time_taken: Number,
    index: Number,
    hacker: String,
    timestamp: Number,
    submitted_at: String,
    level: Number,
})
module.exports = mongoose.model("leaderboard", leaderboard) 