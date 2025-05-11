let express = require("express")
let app = express()
let port = 8081

app.use(express.json())

let routerpermissions = require("./routers/routerpermissions")

let routerusuarios = require("./routers/routerusuarios")

app.use("/permisos", routerpermissions)
app.use("/usuarios", routerusuarios)

app.listen(port, () => {
    console.log("Servidor activo en " + port)
})