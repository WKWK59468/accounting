require("dotenv").config()

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

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
