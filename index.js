import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'

//Crear app
const app = express()

//Routing
app.use('/auth', usuarioRoutes)

//Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})

//Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta Public
app.use(express.static('public'))
