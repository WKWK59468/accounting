const express = require("express")
const router = express.Router()
const userController = require("../../controllers/user.controller")

router.post("/", userController.addUser)
router.post("/verify/:_id", userController.verify)
router.get("/", userController.findAllUser)
router.get("/:_id", userController.findOneUser)
router.patch("/:_id", userController.patchUser)
router.delete("/:_id", userController.deleteUser)

module.exports = router
