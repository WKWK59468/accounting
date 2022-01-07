const express = require("express")
const router = express.Router()

const rendeData = {
  title: "記帳小幫手",
  navBar: [{ name: "首頁" }, { name: "記一筆" }],
}

router.get("/", (req, res, next) => {
  res.render("login", rendeData)
})

module.exports = router
