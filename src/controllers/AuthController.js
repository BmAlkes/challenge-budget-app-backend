const UserModel = require("../models/User.model")

class UserController {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
}

module.exports = UserController
