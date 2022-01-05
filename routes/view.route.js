const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
  res.render("index", { title: "記帳小幫手" })
})

module.exports = router
