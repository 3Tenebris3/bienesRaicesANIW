import nodemailer from 'nodemailer'
import fs from 'fs'


const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const template = fs.readFileSync('./views/emails/templateConfirmacion.html', 'utf-8');
      const { correo, nombre, apellido, token} = datos
      const correoHTML = template
        .replace('{{ nombre }}', nombre)
        .replace('{{ apellido }}', apellido)
        .replace('{{ URL }}', process.env.BACKEND_URL)
        .replace('{{ PORT }}', process.env.BACK_PORT ?? 3000)
        .replace('${{ token }}', token);
      
      //Enviar el mail
      await transport.sendMail({
        from: 'BienesRaices.com',
        to: correo,
        subject: 'Confirma tu Cuenta en BienesRaices.com',
        text:'Confirma tu Cuenta en BienesRaices.com',
        html: correoHTML
      })
}

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const template = fs.readFileSync('./views/emails/templateForgotPassword.html', 'utf-8');
    const { correo, nombre, apellido, token} = datos
    const correoHTML = template
      .replace('{{ nombre }}', nombre)
      .replace('{{ apellido }}', apellido)
      .replace('{{ URL }}', process.env.BACKEND_URL)
      .replace('{{ PORT }}', process.env.BACK_PORT ?? 3000)
      .replace('${{ token }}', token);
    
    //Enviar el mail
    await transport.sendMail({
      from: 'BienesRaices.com',
      to: correo,
      subject: 'Recupera tu contraseña en BienesRaices.com',
      text:'Recupera tu contraseña en BienesRaices.com',
      html: correoHTML
    })
}

export {
    emailRegistro,
    emailOlvidePassword
}