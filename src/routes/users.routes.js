const express = require("express")
const router = express.Router()
const UserModel = require("../models/User.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const checkToken = require("../middlewares/isAuthenticated")
const { Joi, celebrate, erros, Segments } = require("celebrate")
const UserController = require("../controllers/AuthController")

// Private Router

router.get("/user/:id", checkToken, async (req, res) => {
    return new UserController(req, res).userId()
})

// regiter user
router.post(
    "/auth/register",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            age: Joi.number().integer(),
            role: Joi.string().default("admin"),
        }),
        [Segments.QUERY]: {
            token: Joi.string().token().required(),
        },
    }),
    async (req, res) => {
        return new UserController(req, res).authRegister()
    }
)

router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(422).send({ msg: "Required email" })
    }
    if (!password) {
        return res.status(422).send({ msg: "Required Password" })
    }
    //check if user exists
    const user = await UserModel.findOne({ email })

    if (!user) {
        return res.status(404).send({ msg: "User not found" })
    }

    //check if password match
    const checkPassword = await bcryptjs.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).send({ msg: "Password invalid" })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: "24h",
        })

        res.status(200).send({
            msg: "Authetication validation successful",
            token,
            user,
        })
    } catch (e) {
        res.status(500).send({ msg: e.message })
    }
})

module.exports = router
