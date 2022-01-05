const userModels = require("../models/user.model")

class UserController {
  addUser = (req, res) => {
    const body = req.body

    userModels
      .addUser(body)
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        res.send(err)
      })
  }
  fetchOneUser = (req, res) => {
    const params = req.params

    userModels
      .fetchOneUser(params)
      .then((result) => {
        res.render("index", { title: "記帳小幫手", result: result })
      })
      .catch((err) => {
        res.render("index", { title: "記帳小幫手", result: err })
      })
  }
}

module.exports = new UserController()
