const express = require("express")
const routerpermissions = express.Router()

let permissions = require("../data/permissions")

routerpermissions.get("/", (req, res) => {res.json(permissions)})

module.exports = routerpermissions