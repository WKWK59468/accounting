const userModels = require("../models/user.model")
const functionPackage = require("../functionPackage")
const crpyto = require("crypto")

class UserController {
  addUser = (req, res) => {
    const body = req.body

    body.password = crypto
      .createHash("sha256")
      .update(body.password)
      .digest("base64")

    userModels
      .addUser(body)
      .then((result) => {
        res.status(201).json(functionPackage.resultType(201, "OK", result))
      })
      .catch((err) => {
        if (err === "此email已經被註冊了!") {
          res.status(400).json(functionPackage.resultType(400, err, null))
        } else {
          res
            .status(500)
            .json(functionPackage.resultType(500, "ServerError", err))
        }
      })
  }
  findOneUser = (req, res) => {
    const params = req.params

    userModels
      .findOneUser(params)
      .then((result) => {
        res.status(200).json(functionPackage.resultType(200, "OK", result))
      })
      .catch((err) => {
        if (err === "noData") {
          res.status(404).json(functionPackage.resultType(404, err, null))
        } else {
          res
            .status(500)
            .json(functionPackage.resultType(500, "ServerError", err))
        }
      })
  }
  findAllUser = (req, res) => {
    userModels
      .findAllUser()
      .then((result) => {
        res.status(200).json(functionPackage.resultType(200, "OK", result))
      })
      .catch((err) => {
        if (err === "noData") {
          res.status(404).json(functionPackage.resultType(404, err, null))
        } else {
          res
            .status(500)
            .json(functionPackage.resultType(500, "ServerError", err))
        }
      })
  }
  patchUser = (req, res) => {
    const _id = req.params._id
    const body = req.body

    userModels
      .patchUser(_id, body)
      .then((result) => {
        res.status(200).json(functionPackage.resultType(200, "OK", result))
      })
      .catch((err) => {
        if (err === "noData") {
          res.status(400).json(functionPackage.resultType(400, err, null))
        } else {
          res
            .status(500)
            .json(functionPackage.resultType(500, "ServerError", err))
        }
      })
  }
  deleteUser = (req, res) => {
    const _id = req.params._id

    userModels
      .deleteUser(_id)
      .then((result) => {
        res.status(200).json(functionPackage.resultType(200, "OK", result))
      })
      .catch((err) => {
        if (err === "noData") {
          res.status(400).json(functionPackage.resultType(400, "noData", null))
        } else {
          res
            .status(500)
            .json(functionPackage.resultType(500, "ServerError", err))
        }
      })
  }
}

module.exports = new UserController()
