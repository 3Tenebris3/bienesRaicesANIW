import {check,validationResult} from 'express-validator'
import Usuario from "../models/Usuario.js"
import { generarId } from '../helpers/tokens.js'
import { emailRegistro } from '../helpers/emails.js'


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
    await check('validarCorreo').equals(req.body.correo).withMessage('Los correos no coinciden').run(req)
    await check('password').isLength({min: 8}).withMessage('La contraseña debe tener un minimo de 8 caracteres').run(req)
    await check('validarPassword').equals(req.body.password).withMessage('Las contraseñas no coinciden').run(req)

    let resultado = validationResult(req)
    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correo: req.body.correo,
                password: req.body.password
            }
        })
    }

    //Extraer los datos
    const {nombre,apellido,correo,password} = req.body

    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where : { correo }})
    if(existeUsuario){
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El correo ya esta registrado'}],
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido
            }
        })
    }

    const usuario = await Usuario.create({
        nombre,
        apellido,
        correo,
        password,
        token: generarId()
    })

    //Envio email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        token: usuario.token
    })

    //Mostrar mensaje de confirmación
    res.render('templates/mensaje',{
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Se ha enviado un email de confirmación para activar la cuenta'
    })

    return;
}

const formularioForgotPassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar tu contraseña'
    })
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    console.log(token)
    //Verificar siel token es valido
    const usuario = await Usuario.findOne({ where: {token}})
    console.log(usuario)
    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intentalo de nuevo',
            error: true
        })
    }

    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó correctamente',
        error: false
    })

}
 
export {
    formularioLogin,
    formularioRegister,
    registrar,
    formularioForgotPassword,
    confirmar
}