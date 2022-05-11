const express = require("express")
const TransactionModel = require("../models/Transaction")
const router = express.Router()

router.get("/transactions", async (req, res) => {
    try {
        const transactions = await TransactionModel.find({})
        res.status(200).send(transactions)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get("/transactions/:id", async (req, res) => {
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

router.post("/transactions", async (req, res) => {
    try {
        const newTransaction = req.body
        const createTransaction = new TransactionModel(newTransaction)
        await createTransaction.save()
        res.status(201).send(newTransaction)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.patch("/transactions/:id", async (req, res) => {
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

router.delete("/transactions/:id", async (req, res) => {
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

module.exports = router
