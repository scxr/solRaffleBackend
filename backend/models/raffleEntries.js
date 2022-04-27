const mongoose = require("mongoose")


const raffleEntries = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    txid: {
        type: String,
        required: true
    },
    ticketNumber: {
        type: Number,
        required: true
    },
    raffleNumber: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Entries", raffleEntries)