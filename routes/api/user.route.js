const express = require("express")
const router = express.Router()
const userController = require("../../controllers/user.controller")

router.post("/", userController.addUser)
router.get("/:name", userController.fetchOneUser)

module.exports = router
