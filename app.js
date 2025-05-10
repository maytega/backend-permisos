let express = require("express")
let app = express()
let port = 8081

let routerpermissions = require("./routers/routerpermissions")

app.use("/permisos", routerpermissions)

app.listen(port, () => {
    console.log("Servidor activo en " + port)
})