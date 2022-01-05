const express = require("express")
const http = require("http")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const viewRouter = require("./routes/view.route")
const apiRouter = require("./routes/api.route")
const DB = require("./dbconnect")

const app = express()

DB.connectDB()

app.use(logger("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

// Router
app.use("/", viewRouter)
app.use("/api", apiRouter)

const server = http.createServer(app)

const port = process.env.PORT || 3000
app.set("port", port)

server.listen(port)

server.on("listening", () => {
  const addr = server.address()
  console.log(`Server is on ${addr.port}`)
})
