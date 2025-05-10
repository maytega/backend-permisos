const express = require("express")
const routerpermissions = express.Router()

let permissions = require("../data/permissions")

routerpermissions.get("/", (req, res) => {res.json(permissions)})

routerpermissions.post("/", (req, res) => {
    let text = req.body.text
    let userid = req.body.userId

    let lastid = permissions[permissions.length-1].id
    permissions.push({
        id:lastid,
        text:text,
        approbedBy:[],
        userId:userid
    })
    res.json({id:lastid+1})
})

module.exports = routerpermissions