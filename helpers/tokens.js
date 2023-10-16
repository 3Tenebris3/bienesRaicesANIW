import jwt from 'jsonwebtoken'

const generarJWT = id => jwt.sign({ id: usuario.id,nombre: usuario.nombre }, process.env.JWT_SECRET,{ expiresIn: '1d' })


const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

export {
    generarJWT,
    generarId
}