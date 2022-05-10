const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const conectToDataBase = require("./database/mongoose.database")

dotenv.config()

const app = express()
conectToDataBase()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({ msg: "Hello World!" })
})
const port = 5000
app.listen(port, () => console.log("Server is running on port 5000!"))
