import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express();
const port = 3001; // Puedes elegir el puerto que prefieras

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'bdBienesRaices'
});

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ mensaje: '¡API Funcionando!' });
});

// Ruta para obtener datos de una tabla
app.get('/visitas', (req, res) => {
  pool.query(('SELECT bdbienesraices.propiedades.titulo,bdbienesraices.propiedades.habitaciones,bdbienesraices.propiedades.wc, bdbienesraices.precios.nombre , COUNT(bdbienesraices.visitas.id) AS visitas'
  + ' FROM bdbienesraices.propiedades'
  + ' LEFT JOIN bdbienesraices.visitas ON bdbienesraices.propiedades.id = bdbienesraices.visitas.propiedadId'
  + ' LEFT JOIN bdbienesraices.precios ON bdbienesraices.propiedades.precioId = bdbienesraices.precios.id'
  + ' GROUP BY bdbienesraices.propiedades.id'
  + ' ORDER BY visitas DESC LIMIT 6;'), (err, rows) => { 
    if (err) {
      console.log(err);
      res.status(500).send('Error al realizar la consulta');
    } else {
      res.json(rows);
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
