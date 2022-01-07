const express = require("express")
const router = express.Router()
const index = require("./view/index.route")
const login = require("./view/login.route")

router.use("/", index)
router.use("/login", login)

module.exports = router
