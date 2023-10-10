import express from "express";
import { formularioLogin, formularioRegister, registrar, confirmar,formularioForgotPassword, resetPassword} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegister);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioForgotPassword);
router.post('/olvide-password', resetPassword);

export default router