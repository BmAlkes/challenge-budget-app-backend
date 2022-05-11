const checkToken = (req, res, next) => {
    const authHeader = req.header["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).send({ message: "access denied" })
    }
}

module.exports = checkToken
