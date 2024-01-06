import {DataTypes} from 'sequelize'
import db from '../config/db.js'

const Categoria = db.define('categorias', {
    categoria:{
        type: DataTypes.STRING(35)
    }
})

export default Categoria