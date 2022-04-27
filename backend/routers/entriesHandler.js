const express = require("express")
const router = express.Router()
const raffleEntry = require("../models/raffleEntries")

router.get("/entries/:address/:raffleNumber", async (req, res) => {
    if (!req.params.address) {
        return res.status(401).json({message: "Address was not sent with request"})
    } else if(!req.params.raffleNumber) {
        return res.status(401).json({message: "Please specify which raffle to query"})
    }
    const entries = await raffleEntry.find({
        sender: req.params.address,
        raffleNumber: req.params.raffleNumber
    })
    console.log(entries.length)
    return res.status(200).json({message: "Success", entries: entries, count: entries.length})
})

router.get("/entries/:address/", (req, res) => {
    return res.status(401).json({message: "Please specify which raffle to query"})
})
router.get("/entries/", (req, res) => {
    return res.status(401).json({message: "Address was not sent with request"})

})
module.exports = router