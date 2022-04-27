const express = require("express")
const router = express.Router()

router.get("/hello", (req, res) => {
    return res.status(200).json({message: "World"})
})

router.post("/")

module.exports = router