const mongoose = require("mongoose")

const connectToDataBase = async () => {
    await mongoose.connect(
        `mongodb+srv://bmalkes:${process.env.DB_PASSWORD}@budget.bvf2r.mongodb.net/?retryWrites=true&w=majority`,
        () => console.log("Connected to mongoDb")
    )
}

module.exports = connectToDataBase
