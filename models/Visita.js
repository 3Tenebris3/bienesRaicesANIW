import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Visita = db.define('visitas', {
    visita: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Visita