import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

//Crear app
const app = express()

//Conexión a la base de datos
try{
    await db.authenticate();
    console.log('La conexión a la base fue exitosa')
} catch(error){
    console.log(error)
}

//Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta Public
app.use( express.static('public') )

//Routing
app.use('/auth', usuarioRoutes)




//Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})

