const express = require("express")
const router = express.Router()

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("user api")
})

module.exports = router
