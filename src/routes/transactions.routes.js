const express = require("express")
const router = express.Router()
const TransactionController = require("../controllers/TransactionController")
const checkToken = require("../middlewares/isAuthenticated")

router.get("/transactions", async (req, res) => {
    return new TransactionController(req, res).getTransaction()
})

router.get("/transactions/:id", async (req, res) => {
    return new TransactionController(req, res).getTransactionById()
})

router.post("/transactions", async (req, res) => {
    return new TransactionController(req, res).postTransaction()
})

router.patch("/transactions/:id", async (req, res) => {
    return new TransactionController(req, res).updateTransaction()
})

router.delete("/transactions/:id", async (req, res) => {
    return new TransactionController(req, res).deleteTransaction()
})

module.exports = router
