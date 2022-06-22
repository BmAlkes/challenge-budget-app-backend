const UserModel = require("../models/User.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

class UserController {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
}
module.exports = UserController
