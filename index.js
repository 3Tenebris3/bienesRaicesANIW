import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import db from './config/db.js'
import path from 'path';
import { fileURLToPath } from 'url';

// Crear la app
const app = express()

// Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) )

// Habilitar Cookie Parser
app.use( cookieParser() )

// Habilitar CSRF
app.use( csrf({cookie: true}) )

// Conexión a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexión Correcta a la Base de datos')
} catch (error) {
    console.log(error)
}

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta Pública
app.use( express.static('public') )

// Routing
app.use('/', appRoutes)
app.use('/auth', usuarioRoutes)
app.use('/', propiedadesRoutes)
app.use('/api', apiRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirve los archivos estáticos de React
app.use(express.static(path.join(__dirname, 'client/build')));

// Ruta para acceder a la aplicación React
app.get('/mi-vista-react', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});