const dotenv = require('dotenv');
const raffleModel = require("../models/raffleModel")
const raffleEntry = require("../models/raffleEntries")
const express = require("express")
const router = express.Router()
dotenv.config()

async function newRaffleNo() {
    const currentRaffle = await raffleModel.find()
    console.log(currentRaffle)
}

router.post("/newRaffle", async(req, res) => {
    if (!req.body.startTime) {
        return res.status(401).json({message: "Missing Start Time"})
    } else if (!req.body.endTime) {
        return res.status(401).json({message: "Missing End Time"})
    } else if (!req.body.entryPrice) {
        return res.status(401).json({message: "Missing Entry Price"})
    } else if (!req.body.maxEntryPP) {
        return res.status(401).json({message: "Missing Max Entries"})
    } else if (!req.body.maxTotal) {
        return res.status(401).json({message: "Missing Max Total Tickets"})
    } else if (!req.body.nftRaffle) {
        return res.status(401).json({message: "Missing nft to raffle"})
    } else if (req.body.pword !=="lol2") {
        return res.status(403).json({message: "Incorrect password"})
    }
    const u = {
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        entryPrice: req.body.entryPrice,
        maxEntriesPp: req.body.maxEntryPP,
        maxTotalTickets: req.body.maxTotal,
        nftRaffle: req.body.nftRaffle,
        raffleNumber: 2
    }
    console.log("Update vals: ", u)
    const newRaffle = await raffleModel.findOneAndUpdate({}, u)
    return res.status(200).json({message: "Success", raffleObject: newRaffle})
})

router.get("/allRaffles", async (req, res) => {
    const rafs = await raffleModel.find()
    return res.status(200).json({raffles:rafs })
})

router.get("/allEntries", async (req, res) => {
    const entrs = await raffleEntry.find()
    return res.status(200).json({message:"Found", entries: entrs})
})

router.get("/currentRaffle", async(req, res)=>{
    const raffle = await raffleModel.findOne()
    res.status(200).json({message:"Success", raffle: raffle})
})

router.post("/verifyAccess", (req, res) => {
    if (req.body.access === "lol") {
        return res.status(200).json({message: "Valid"})
    } else {
        return res.status(403).json({message: "Invalid"})
    }
})
module.exports = router