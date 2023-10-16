import express from "express";
import { formularioLogin, formularioRegister, registrar, confirmar,
    formularioForgotPassword, resetPassword , comprobarToken, nuevaPassword, autenticar} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', formularioLogin);
router.post('/login', autenticar);

router.get('/registro', formularioRegister);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioForgotPassword);
router.post('/olvide-password', resetPassword);

router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevaPassword);

export default router