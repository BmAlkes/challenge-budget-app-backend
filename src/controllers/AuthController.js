const UserModel = require("../models/User.model")

class UserController {
    constructor(req, res) {
        this.req = req
        this.res = res
    }

    async Register() {
        try {
            const newUser = this.req.body
            const createUser = new UserModel(newUser)
            await createUser.save()
            this.res.status(201).send(newUser)
        } catch (err) {
            this.res.status(500).send(err.message)
        }
    }
    async Login() {}
}

module.exports = UserController
