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

const formularioForgotPassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar tu contraseña'
    })
}
 
export {
    formularioLogin,
    formularioRegister,
    formularioForgotPassword
}