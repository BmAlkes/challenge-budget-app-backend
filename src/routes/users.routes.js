const express = require("express")
const router = express.Router()
const UserModel = require("../models/User.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const checkToken = require("../middlewares/isAuthenticated")

// Private Router

router.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id
    //check if user exists

    const user = await UserModel.findById(id, "-password")

    if (!user) {
        return res.status(404).send({ message: "User not found" })
    }
    res.status(200).send({ user })
})

// regiter user
router.post("/auth/register", async (req, res) => {
    const { name, email, password } = req.body

    //validation
    const userExist = await UserModel.findOne({ email })

    if (userExist) {
        return res.status(422).send({ msg: "User already exists" })
    }
    // create passaword
    const salt = await bcryptjs.genSalt(10)
    const passwordHash = await bcryptjs.hash(password, salt)

    const user = new UserModel({ name, email, password: passwordHash })
    try {
        await user.save()
        res.status(200).send({ msg: "User Created" })
    } catch (e) {
        console.log(e)
        return res.status(500).send(e.message)
    }
})

router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(422).send({ msg: "Required email" })
    }
    if (!password) {
        return res.status(422).send({ msg: "Required Password" })
    }
    //check if user exists
    const userExist = await UserModel.findOne({ email })

    if (!userExist) {
        return res.status(404).send({ msg: "User not found" })
    }

    //check if password match
    const checkPassword = await bcryptjs.compare(password, userExist.password)

    if (!checkPassword) {
        return res.status(422).send({ msg: "Password invalid" })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({ id: userExist._id }, secret, {
            expiresIn: "24h",
        })

        res.status(200).send({
            msg: "Authetication validation successful",
            token,
        })
    } catch (e) {
        res.status(500).send({ msg: e.message })
    }
})

module.exports = router
