const TransactionModel = require("../models/Transaction")
class TransactionController {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
    async getTransaction() {
        try {
            const transactions = await TransactionModel.find({})
            this.res.status(200).send(transactions)
        } catch (err) {
            this.res.status(500).send(err.message)
        }
    }
    async getTransactionById() {
        try {
            const transaction = await TransactionModel.findById(
                this.req.params.id
            )
            if (!transaction) {
                return res.status(404).send("transaction not found")
            }
            this.res.status(200).send(transaction)
        } catch (err) {
            this.res.status(500).send(err.message)
        }
    }
    async postTransaction() {
        try {
            const newTransaction = this.req.body
            const createTransaction = new TransactionModel(newTransaction)
            await createTransaction.save()
            this.res.status(201).send(newTransaction)
        } catch (err) {
            this.res.status(500).send(err.message)
        }
    }
    async updateTransaction() {
        try {
            const transaction = this.req.params.id
            const transactionData = this.req.body

            const transactionToUpdate = await TransactionModel.findById(
                transaction
            )

            const allowedToUpdate = ["title", "amount", "category", "type"]
            const requestUpdates = Object.keys(transactionData)

            for (const update of requestUpdates) {
                if (allowedToUpdate.includes(update)) {
                    transactionToUpdate[update] = this.req.body[update]
                }
            }
            await transactionToUpdate.save()
            return this.res.status(200).send(transactionToUpdate)
        } catch (err) {
            this.res.status(500).send(err.message)
        }
    }
    async deleteTransaction() {
        try {
            const transactionsId = this.req.params.id
            const transactionToDelete = await TransactionModel.findById(
                transactionsId
            )

            if (!transactionToDelete) {
                return this.res.status(404).send("Not found")
            }
            const deleteTransaction = await TransactionModel.findByIdAndDelete(
                transactionsId
            )
            this.res.status(200).send(deleteTransaction)
        } catch (err) {
            this.res.status(500).send(err.message)
        }
    }
}
module.exports = TransactionController
