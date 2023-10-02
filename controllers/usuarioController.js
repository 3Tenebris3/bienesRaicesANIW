import {check,validationResult} from 'express-validator'
import Usuario from "../models/Usuario.js"


const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}

const formularioRegister = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}

const registrar = async (req, res) => {
    
    //Validación
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('apellido').notEmpty().withMessage('El apellido no puede ir vacio').run(req)
    await check('correo').isEmail().withMessage('El correo no puede ir vacio').run(req)
    await check('cCorreo').equals('correo').withMessage('Los correos no coinciden').run(req)
    await check('password').isLength({min: 8}).withMessage('La contraseña debe tener un minimo de 8 caracteres').run(req)
    await check('rPassword').equals('password').withMessage('Las contraseñas no coinciden').run(req)

    let resultado = validationResult(req)

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correo: req.body.correo
            }
        })
    }

    const usuario = await Usuario.create(req.body);
    res.json(usuario)
}

const formularioForgotPassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar tu contraseña'
    })
}
 
export {
    formularioLogin,
    formularioRegister,
    registrar,
    formularioForgotPassword
}