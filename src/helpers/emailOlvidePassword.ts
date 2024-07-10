import nodemailer from "nodemailer";
import { IVeterinario } from "../models/Veterinario";


const gerarNuevoPassword= async (datos: IVeterinario)=>{
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
          subject:"Generar un nuevo password en APV",
          text:"Generar nuevo password en APV",
          html:`<p>Hola:  ${nombre} , has solicitado restablecer tu password</p>
                <p>Siguiente el siguiente enlace para generar nuevo password: 
                 <a href="${process.env.FRONTEND_URL}/olvide/${token}">Generar nuevo password</a> </p>

                 <p>Si tu no solicitaste generar nuevo password ignora este mensaje</p> 
          `
      })
      console.log("Mensaje enviado: %s", info.messageId);
}

export default gerarNuevoPassword