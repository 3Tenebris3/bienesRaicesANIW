import express from "express";
import { formularioLogin, formularioRegister, registrar, formularioForgotPassword, confirmar} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegister);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioForgotPassword);

export default router