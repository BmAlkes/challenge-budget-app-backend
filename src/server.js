const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const conectToDataBase = require("./database/mongoose.database")
const TransactionModel = require("./models/Transaction")
dotenv.config()

const app = express()
conectToDataBase()

app.use(cors())
app.use(express.json())

app.get("/transactions", async (req, res) => {
    try {
        const transactions = await TransactionModel.find({})
        res.status(200).send(transactions)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post("/transactions", async (req, res) => {
    try {
        const newTransaction = req.body
        const createTransaction = new TransactionModel(newTransaction)
        await createTransaction.save()
        res.status(201).send(newTransaction)
    } catch (err) {
        res.status(500).send(err.message)
    }
})
const port = 5000
app.listen(port, () => console.log("Server is running on port 5000!"))
