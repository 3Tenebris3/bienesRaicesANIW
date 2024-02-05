import { Sequelize } from 'sequelize'
import { Precio, Categoria, Propiedad } from '../models/index.js'
import axios from 'axios'

const inicio = async (req, res) => {
    const [ categorias, precios, casas, departamentos ] = await Promise.all([
        Categoria.findAll({raw: true}),
        Precio.findAll({raw: true}),
        Propiedad.findAll({
            limit: 3,
            where: { 
                categoriaId: 1
            },
            include: [
                {
                    model: Precio, 
                    as: 'precio'
                }
            ], 
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Propiedad.findAll({
            limit: 3,
            where: { 
                categoriaId: 2
            },
            include: [
                {
                    model: Precio, 
                    as: 'precio'
                }
            ], 
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ])

    // Realiza una solicitud a tu API
    const urlApi = 'http://localhost:3001/visitas'; // Cambia esto por la URL real de tu API
    const { data } = await axios.get(urlApi);

    res.render('inicio', {
        pagina: 'Inicio',
        categorias,
        precios,
        casas,
        data,
        departamentos,
        csrfToken: req.csrfToken()
    })
}

const categoria = async (req, res) => {
    const { id } = req.params;

    // Comprobar que la categoria exista
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
        return res.redirect('/404');
    }

    // Obtener todas las propiedades
    const todasLasPropiedades = await Propiedad.findAll({
        include: [{ model: Precio, as: 'precio' }]
    });

    let propiedadesDeCategoria = [];

    // Filtrar propiedades por categoría manualmente
    todasLasPropiedades.forEach(propiedad => {
        if (propiedad.categoriaId == id) {
            propiedadesDeCategoria.push(propiedad);
        }
    });

    res.render('categoria', {
        pagina: `${categoria.nombre}s en Venta`,
        propiedades: propiedadesDeCategoria,
        csrfToken: req.csrfToken()
    });
}


const noEncontrado = (req, res) => {
    res.render('404', {
        pagina: 'No Encontrada',
        csrfToken: req.csrfToken()
    })
}

const buscador = async (req, res) => {
    const { termino } = req.body;

    if (!termino.trim()) {
        return res.redirect('back');
    }

    const todasLasPropiedades = await Propiedad.findAll({
        include: [{ model: Precio, as: 'precio' }]
    });

    let propiedadesFiltradas = [];
    const terminoEnMinuscula = termino.toLowerCase();
    const palabras = terminoEnMinuscula.split(' ');

    // Inicializar variables para los filtros adicionales
    let numeroHabitaciones = null;
    let numeroEstacionamiento = null;
    let numeroWc = null;

    // Función para extraer número después de un término específico
    const extraerNumero = (palabraClave) => {
        const indice = palabras.indexOf(palabraClave);
        if (indice !== -1 && palabras.length > indice + 1 && !isNaN(palabras[indice + 1])) {
            return parseInt(palabras[indice + 1], 10);
        }
        return null;
    };

    // Extraer números para cada término
    numeroHabitaciones = extraerNumero('habitaciones');
    numeroEstacionamiento = extraerNumero('estacionamiento');
    numeroWc = extraerNumero('wc');

    // Filtrar propiedades manualmente
    todasLasPropiedades.forEach(propiedad => {
        // Verificar si el término de búsqueda coincide con alguna de las características de la propiedad
        if ((numeroHabitaciones !== null && propiedad.habitaciones === numeroHabitaciones) ||
            (numeroEstacionamiento !== null && propiedad.estacionamiento === numeroEstacionamiento) ||
            (numeroWc !== null && propiedad.wc === numeroWc) ||
            (numeroHabitaciones === null && numeroEstacionamiento === null && numeroWc === null && propiedad.titulo.toLowerCase().includes(terminoEnMinuscula))) {
            propiedadesFiltradas.push(propiedad);
        }
    });

    res.render('busqueda', {
        pagina: 'Resultados de la Búsqueda',
        propiedades: propiedadesFiltradas,
        csrfToken: req.csrfToken()
    });
}




export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}