const express = require("express")
const app = express()
const PORT = 4444
const monitor = require("./routers/monitorAddy")
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const cors = require("cors")
app.use(express.json())

dotenv.config()
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"]
}))
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true})
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.on("open", () => console.log("Connected"))
app.get("/", (req, res) => {
    res.send("hello world")
})
const handleEntries = require("./routers/entriesHandler")
const adminRouter = require("./routers/adminRouter")
app.use(handleEntries)
app.use(adminRouter)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})