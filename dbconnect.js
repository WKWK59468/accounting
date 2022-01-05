require("dotenv").config()

const mongoose = require("mongoose")
mongoose.connect("mongodb://weirdooo.nutc.edu.tw:63426/accounting", {
  useNewUrlParser: true,
})

module.exports = {
  connectDB: () => {
    const db = mongoose.connection

    db.on("error", (err) => {
      console.log(err)
    })

    db.once("open", () => {
      console.log("Connected to Database")
    })
  },
}
