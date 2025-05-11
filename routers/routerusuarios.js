const express = require("express")
const routerusuarios = express.Router()

let usuarios = require("../data/user")

routerusuarios.get("/", (req, res) => {
    res.json(usuarios.map(u => {return{id: u.id, email: u.email}}

    ))})

module.exports = routerusuarios 