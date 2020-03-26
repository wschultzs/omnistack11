const express = require("express")
const routes = require("./src/routes")

const port = 3333
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes) 

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
})