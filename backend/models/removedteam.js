const mongoose = require("mongoose")

const removedteams = new mongoose.Schema({
    hacker_id: Number,
    rank: Number,
    score: Number,
    time_taken: Number,
    index: Number,
    hacker: String,
    timestamp: Number,
    submitted_at: String,
    level: Number,
},{
    timestamps:true
}
    )
module.exports = mongoose.model("removed teams", removedteams)
