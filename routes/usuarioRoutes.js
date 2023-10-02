import express from "express";
import { formularioLogin, formularioRegister, formularioForgotPassword } from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', formularioLogin);
router.get('/registro', formularioRegister);
router.get('/olvide-password', formularioForgotPassword);

export default router;