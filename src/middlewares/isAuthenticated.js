const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).send({ message: "acess denied" })
    }
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (err) {
        res.status(404).send({ message: "Token Invalid" })
    }
}

module.exports = checkToken
