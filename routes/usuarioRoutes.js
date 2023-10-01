import express from "express";
import { formularioLogin, formularioRegister } from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', formularioLogin);
router.get('/registro', formularioRegister);

export default router;