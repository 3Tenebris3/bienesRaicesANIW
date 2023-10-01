const formularioLogin = (req, res) => {
    res.render('auth/login', {
    })
}

const formularioRegister = (req, res) => {
    res.render('auth/registro', {
    })
}

export {
    formularioLogin,
    formularioRegister
}