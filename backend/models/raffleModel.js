const mongoose = require("mongoose")
function rndm() {
    return Math.floor(Math.random() * 1000000)
}
const raffleSchema = new mongoose.Schema({
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    entryPrice: {
        type: Number,
        required: true
    },
    maxEntriesPp: {
        type: Number,
        required: true,
    },
    maxTotalTickets: {
        type: Number,
        required: true
    },
    raffleNumber: {
        type: Number,
        required: true,
        default: rndm
    },
    nftRaffle: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Raffle", raffleSchema)