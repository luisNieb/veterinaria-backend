import { Request, Response, NextFunction } from "express";
import Veterinario, { IVeterinario } from "../models/Veterinario";

declare global {
  namespace Express {
    interface Request {
      veterinario: IVeterinario;
    }
  }
}


export async function validarVeterinarioExists(
  request: Request,
  response: Response,
  next: NextFunction
) {
 
  //prevenir usuarios duplicados
  const existeUsuario = await Veterinario.findOne({
    email: request.body.email,
  });
  
  if (existeUsuario) {
    const error = new Error("El usuario ya esta registrado"); 
    return response.status(400).json({ error: error.message });
  }
  
  request.veterinario= existeUsuario
  next();
}


export async function autenticarVeterinarioExists(
  request: Request,
  response: Response,
  next: NextFunction
) {

  //verificamos que el usuario este el la db
  const existeUsuario = await Veterinario.findOne({
    email: request.body.email,
  });
  
  if (!existeUsuario) {
    const error = new Error("El usuario no existe");
    return response.status(404).json({ error: error.message });
  }
  
  request.veterinario= existeUsuario
  next();
}


export async function validarToken(request: Request, response: Response, next: NextFunction){
       //parametero que viene el la url
       const {token}= request.params
       try {

           const usuarioConfirmar= await Veterinario.findOne({token:token});
 
          
           if (!usuarioConfirmar){
               const error= new Error('Token no valido')
               return response.status(400).json({error: error.message});
           }
           request.veterinario= usuarioConfirmar
           next()

          }catch (error){
            response.status(400).json({msg: "Error authent"});
          }
}
