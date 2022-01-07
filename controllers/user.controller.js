const userModels = require("../models/user.model")
const functionPackage = require("../functionPackage")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types

class UserController {
  addUser = async (req, res) => {
    const body = req.body
    const salt = await bcrypt.genSalt(10)

    body.password = await bcrypt.hash(body.password, salt)

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
  verify = (req, res) => {
    if (ObjectId.isValid(req.params._id)) {
      userModels
        .findOneUser(req.params)
        .then((result) => {
          bcrypt
            .compare(req.body.password, result[0].password)
            .then((check) => {
              if (check) {
                res
                  .status(200)
                  .json(functionPackage.resultType(200, "OK", null))
              } else {
                res
                  .status(400)
                  .json(functionPackage.resultType(400, "Password Error", null))
              }
            })
            .catch((err) => {
              res
                .status(400)
                .json(functionPackage.resultType(400, "Password Error", null))
            })
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
    } else {
      res
        .status(400)
        .json(functionPackage.resultType(400, "_id Format Error", null))
    }
  }
}

module.exports = new UserController()
