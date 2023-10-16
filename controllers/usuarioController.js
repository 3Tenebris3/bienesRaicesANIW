import {check,validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'
import jwt from 'jsonwebtoken'
import { generarId, generarJWT } from '../helpers/tokens.js'
import { emailOlvidePassword, emailRegistro } from '../helpers/emails.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken()
    })
}

const autenticar = async (req, res) => {
    await check('correo').isEmail().withMessage('El correo es obligatorio').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    let resultado = validationResult(req)
    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesión',
            csrfToken : req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                correo: req.body.correo
            }
        })
    }

    const { correo,password } = req.body

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ where: { correo } })

    if(!usuario){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesión',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'El usuario no existe'}]
        })
    }

    if(!usuario.confirmado){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesión',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'Tienes que confirmar tu cuenta para ingresar. Revisa tu correo el mail de confirmación'}]
        })
    }

    //Revisar Contraseña
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesión',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'La contraseña es incorrecta'}]
        })
    }

    //Autenticar el usuario

    const token = generarJWT({ id: usuario.id,nombre: usuario.nombre })

    return res.cookie('_token', token, {
        httpOnly: true
        //,secure: true,
    }).redirect('/mis-propiedades')
}

const formularioRegister = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken : req.csrfToken()
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
            csrfToken : req.csrfToken(),
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
            csrfToken : req.csrfToken(),
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

const confirmar = async (req, res) => {
    const { token } = req.params;

    //Verificar siel token es valido
    const usuario = await Usuario.findOne({ where: {token}})
    
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

const formularioForgotPassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar tu contraseña',
        csrfToken : req.csrfToken()
    })
}

const resetPassword = async (req,res) => {
    //Validación
    await check('correo').isEmail().withMessage('El correo ingresado no es valido').run(req)

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        return res.render('auth/olvide-password',{
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    //Buscar el usuario
    const {correo} = req.body

    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where : { correo }})

    if(!existeUsuario){
        return res.render('auth/olvide-password',{
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El correo no pertenece a ningún usuario'}]
        })
    }

    //Genero Token unico por usuario
    existeUsuario.token = generarId();
    //Guardo los datos en la base
    await existeUsuario.save();

    //Enviar Email
    emailOlvidePassword({
        nombre: existeUsuario.nombre,
        apellido: existeUsuario.apellido,
        correo: existeUsuario.correo,
        token: existeUsuario.token
    })

    //Renderizar un mensaje
    //Mostrar mensaje de confirmación
    res.render('templates/mensaje',{
        pagina: 'Recuperar tu Contraseña',
        mensaje: 'Se ha enviado un email para recuperar la contraseña de su cuenta'
    })

    return
}

const comprobarToken = async (req,res) => {
    
    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: {token}})

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Error al cambiar de contraseña',
            mensaje: 'Hubo un error al cambiar tu contraseña, verifica que hayas ingresado por medio del mail de recuperación e intentalo de nuevo',
            error: true
        })
    }

    //Mostrar formulario para reiniciar contraseña
    return res.render('auth/reset-password',{
        pagina: 'Cambia tu Contraseña',
        csrfToken: req.csrfToken()
    })
}

const nuevaPassword = async (req,res) => {

    //Validar Password
    await check('password').isLength({min: 8}).withMessage('La contraseña debe tener un minimo de 8 caracteres').run(req)
    await check('rPassword').equals(req.body.password).withMessage('Las contraseñas no coinciden').run(req)

    let resultado = validationResult(req)
    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        return res.render('auth/reset-password',{
            pagina: 'Restablece tu password',
            csrfToken : req.csrfToken(),
            errores: resultado.array()
        })
    }

    //Identificar quien hace el resultado
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({  where: {token}})

    //Hashear Password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash( password, salt);
    usuario.token = null;

    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina: 'Contraseña Restablecida',
        mensaje: 'La contraseña se guardo correctamente'
    })
}
 
export {
    formularioLogin,
    formularioRegister,
    registrar,
    formularioForgotPassword,
    confirmar,
    resetPassword,
    comprobarToken,
    nuevaPassword,
    autenticar
}