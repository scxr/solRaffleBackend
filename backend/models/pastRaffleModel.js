const mongoose = require("mongoose")

const pastRaffles = new mongoose.Schema({
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
        required: true
    },
    nftRaffleName: {
        type: String,
        required: true
    },
    nftRaffleImg : {
        type: String,
        required: true
    },
    entryNumber: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("PastRaffles", pastRaffles)