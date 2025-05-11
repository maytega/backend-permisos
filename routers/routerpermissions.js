const express = require("express")
const routerpermissions = express.Router()

let permissions = require("../data/permissions")
let usuarios = require("../data/user")

routerpermissions.get("/", (req, res) => {res.json(permissions)})

routerpermissions.post("/", (req, res) => {
    let text = req.body.text
    let email = req.body.email
    let password = req.body.password

    let listusers = usuarios.filter(u=> u.email == email && u.password == password)

    if(listusers.length == 0){
        return res.status(401).json({error: "Usuario no autorizado"})
    }

    let errores =[]

    if(text == undefined){
        errores.push("El texto no esta en el body")
    }

    if(errores.length > 0){
        return res.status(400).json({errores: errores})
    }

    let lastid = permissions[permissions.length-1].id 
    permissions.push({
        id:lastid+1,
        text:text,
        approbedBy:[],
        userId:listusers[0].id
    })
    res.json({id:lastid+1})
})

module.exports = routerpermissions