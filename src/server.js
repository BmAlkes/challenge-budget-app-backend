const express = require("express")
const cookieSession = require("cookie-session")
const cors = require("cors")
const dotenv = require("dotenv")

const TransactionRouter = require("./routes/transactions.routes")
const UserRouter = require("./routes/users.routes")

const conectToDataBase = require("./database/mongoose.database")

dotenv.config()
const app = express()
app.use(cookieSession({ name: "bmalkes", keys: ["bmalkes"] }))
app.use(express.json())
app.use(cors())

conectToDataBase()

app.use("/", TransactionRouter)
app.use("/", UserRouter)

const port = 5000
app.listen(port, () => console.log("Server is running on port 5000!"))
