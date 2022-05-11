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

app.get("/transactions/:id", async (req, res) => {
    try {
        const transaction = await TransactionModel.findById(req.params.id)
        if (!transaction) {
            return res.status(404).send("transaction not found")
        }
        res.status(200).send(transaction)
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

app.patch("/transactions/:id", async (req, res) => {
    try {
        const transaction = req.params.id
        const transactionData = req.body

        const transactionToUpdate = await TransactionModel.findById(transaction)

        const allowedToUpdate = ["title", "amount", "category", "type"]
        const requestUpdates = Object.keys(transactionData)

        for (update of requestUpdates) {
            if (allowedToUpdate.includes(update)) {
                transactionToUpdate[update] = req.body[update]
            }
        }
        await transactionToUpdate.save()
        return res.status(200).send(transactionToUpdate)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.delete("/transactions/:id", async (req, res) => {
    try {
        const transactionsId = req.params.id
        const transactionToDelete = await TransactionModel.findById(
            transactionsId
        )

        if (!transactionToDelete) {
            return res.status(404).send("Not found")
        }
        const deleteTransaction = await TransactionModel.findByIdAndDelete(
            transactionsId
        )
        res.status(200).send(deleteTransaction)
    } catch (err) {
        res.status(500).send(err.message)
    }
})
const port = 5000
app.listen(port, () => console.log("Server is running on port 5000!"))
