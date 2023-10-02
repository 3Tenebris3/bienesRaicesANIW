const formularioLogin = (req, res) => {
    res.render('auth/login', {
    })
}

const formularioRegister = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}
 
export {
    formularioLogin,
    formularioRegister
}