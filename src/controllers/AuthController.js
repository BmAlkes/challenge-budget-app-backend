const UserModel = require("../models/User.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

class UserController {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
    async userId() {
        try {
            const id = this.req.params.id
            //check if user exists

            const user = await UserModel.findById(id, "-password")

            if (!user) {
                return this.res.status(404).send({ message: "User not found" })
            }
            this.res.status(200).send({ user })
        } catch (e) {
            console.log({ message: e.message })
        }
    }

    async authRegister() {
        const { name, email, password } = this.req.body

        //validation
        const userExist = await UserModel.findOne({ email })

        if (userExist) {
            return this.res.status(422).send({ msg: "User already exists" })
        }
        // create passaword
        const salt = await bcryptjs.genSalt(10)
        const passwordHash = await bcryptjs.hash(password, salt)

        const user = new UserModel({ name, email, password: passwordHash })
        try {
            await user.save()
            this.res.status(200).send({ msg: "User Created", user })
        } catch (e) {
            console.log(e)
            return this.res.status(500).send(e.message)
        }
    }
}

module.exports = UserController
