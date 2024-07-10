

import nodemailer from "nodemailer";
import { IVeterinario } from "../models/Veterinario";


const emailRegistro= async (datos: IVeterinario)=>{
    var transport = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    
      const { email , nombre, token} =datos
      //enviar el email 
      const info = await transport.sendMail({
          from: "APV - Administrador de pacientees de veterinaria",
          to:email,
          subject:"Comprueva tu cuenta en APV",
          text:"Comprueva tu cuenta en APV",
          html:`<p>Hola:  ${nombre} , comprueba tu cuenta en APV</p>
                <p>Tu cuenta esta lista, solo debes comprobarla en el siguiente enlace: 
                 <a href="${process.env.FRONTEND_URL}/confirmar/${token}">comprobar tu cuenta</a> </p>

                 <p>Si tu no creaste esta cuenta puedes ignorar este mensaje</p> 
          `
      })
      console.log("Mensaje enviado: %s", info.messageId);
}

export default emailRegistro