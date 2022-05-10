const mongoose = require("mongoose")

const TransactionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        required: true,
    },
    created_by: {
        created_by: mongoose.ObjectId,
    },
    timestamps: { timestamps: true },
})

const TransactionModel = mongoose.model("Transaction", TransactionSchema)
