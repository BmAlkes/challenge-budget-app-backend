const mongoose = require("mongoose")
const UserModel = require("./User.model")
const TransactionSchema = mongoose.Schema(
    {
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
        created_by: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
)

const TransactionModel = new mongoose.model("Transaction", TransactionSchema)
module.exports = TransactionModel
