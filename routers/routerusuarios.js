const express = require("express")
const routerusuarios = express.Router()

let usuarios = require("../data/user")

routerusuarios.get("/", (req, res) => {
    res.json(usuarios.map(u => {return{id: u.id, email: u.email}}

    ))})

    routerusuarios.get("/:id", (req, res) => {
        let id = req.params.id

        if(id == undefined){
            return res.status(400).json({error: "no hay id"})
        }

        let usuario = usuarios.find(u => u.id == id)

        if(usuario == undefined){
            return res.status(400).json({error: "no existe el usuario"})
        }

        res.json({id:usuario.id, email:usuario.email})
    })

module.exports = routerusuarios 