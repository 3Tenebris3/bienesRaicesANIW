import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Andres',
        email: 'Andriu_red@hotmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    }
]

export default usuarios