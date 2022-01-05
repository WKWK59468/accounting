const userModels = require("../models/user.model")

class UserController {
  addUser = (req, res) => {
    res.send("user")
  }
}

module.exports = new UserController()
