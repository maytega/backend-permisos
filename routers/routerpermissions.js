const express = require("express")
const routerpermissions = express.Router()

let permissions = require("../data/permissions")
let usuarios = require("../data/user")
let authorizers = require("../data/authorizers")


routerpermissions.get("/:id", (req, res) => {
        let id = req.params.id

        if(id == undefined){
            return res.status(400).json({error: "no hay id"})
        }

        let permiso = permissions.find(u => u.id == id)

        if(permiso == undefined){
            return res.status(400).json({error: "no existe el usuario"})
        }

        res.json(permiso)
    })

    routerpermissions.get("/", (req, res) => {
        let texto = req.query.text

        if(texto != undefined){
            let permisoscontexto = permissions.filter(p=>p.text.includes(text))
            return res.json(permisoscontexto)
        }

        return res.status(400).json({error:"parametro de query indefinido"})
    })

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
        approvedBy:[],
        userId:listusers[0].id
    })
    res.json({id:lastid+1})
})

routerpermissions.put("/:id/approvedBy", (req, res) => {
    let permissionsid = req.params.id
    let email = req.body.email
    let password = req.body.password

    //Autenticar
    let autorizado = authorizers.find(a => a.email == email && a.password == password)

    if(autorizado == undefined){
        return res.status(401).json({error: "no autorizado"})
    }

    //Validar
    let id = authorizers.find(a => a.id == permissionsid)

    if(id == undefined){
        return res.status(400).json({error: "no existe la id especificada"})
    }

    //Todo OK
    let permiso = permissions.find(
        p => p.id = permissionsid
    )

    permiso.approvedBy.push(autorizado.id)

    res.json(permiso)
})

module.exports = routerpermissions