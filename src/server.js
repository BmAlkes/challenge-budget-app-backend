const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const TransactionRouter = require("./routes/transactions.routes")
const UserRouter = require("./routes/users.routes")

const conectToDataBase = require("./database/mongoose.database")

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

conectToDataBase()

app.use("/", TransactionRouter)
app.use("/", UserRouter)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening in the ${port}`))
