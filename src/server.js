const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const TransactionRouter = require("./routes/transactions.routes")
const UserRouter = require("./routes/users.routes")

const conectToDataBase = require("./database/mongoose.database")

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

conectToDataBase()

app.use("/", TransactionRouter)
app.use("/", UserRouter)

const port = 5000
app.listen(port, () => console.log("Server is running on port 5000!"))
