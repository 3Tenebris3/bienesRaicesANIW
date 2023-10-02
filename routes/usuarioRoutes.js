import express from "express";
import { formularioLogin, formularioRegister, registrar, formularioForgotPassword} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegister);
router.post('/registro', registrar);

router.get('/olvide-password', formularioForgotPassword);

export default router