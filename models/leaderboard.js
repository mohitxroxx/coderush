const mongoose = require("mongoose")

const leaderboard = new mongoose.Schema({
    hacker_id: Number,
    language: String,
    worst_testcase_time: Number,
    rank: Number,
    score: Number,
    time_taken: Number,
    index: Number,
    hacker: String,
    avatar: String,
    country: String,
    school: String,
    company: String,
    timestamp: Number,
    submitted_at: String,
    is_multiple_contest: Boolean,
    level: Number,
})
module.exports = mongoose.model("leaderboard", leaderboard) 