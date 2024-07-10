import type { Request, Response } from "express";
import Veterinario from "../models/Veterinario";
import generatJWT from "../helpers/generarJWT";
import generarId from "../helpers/generarId";
import emailRegistro from "../helpers/emailRegistro";
import gerarNuevoPassword from "../helpers/emailOlvidePassword";
import { body } from "express-validator";



export class VeterinarioController {

   
    static createVeterinario = async (request: Request, response: Response)=>{
          const veterinario= new Veterinario(request.body);
         
          try{
            const veterinarioGuardado = await veterinario.save();
            response.send('El usuario se creo correctamente')

            //!enviar el email 
            emailRegistro(veterinarioGuardado)

          }catch(error){
             console.log(error);
          }

    };//termina crear veterinario

    static confirmarCuenta= async function (req: Request, res: Response){
       
        try {
             req.veterinario.token= null;
             req.veterinario.confirmado= true;
             await req.veterinario.save()
             res.json({msg: 'Usuario confirmado correctamente'})
               
        } catch (error) {
            console.log(error)
        }
        
    }//confirmar cuenta 

    static autenticar = async function (req: Request, res: Response){

        try {
            console.log(req.veterinario.confirmado);
            if(!req.veterinario.confirmado){
                const error = new Error('Tu cuenta no a sido confirmada revisa tu correo')
                return res.status(403).json({ error: error.message })
            }
            //autenticar el usuario 
            
            if(await req.veterinario.comprobarPassword(req.body.password)){
               //autenticar el usuario json web token asignamos el jwt al token de usuario
               res.json({
                   _id: req.veterinario.id,
                   nombre: req.veterinario.nombre,
                   email:req.veterinario.email,
                   token:generatJWT(req.veterinario.id)
               })//retornamos el veterinarion con el jwt

            }else{
                const error = new Error('El password es incorrecto')
                return res.status(403).json({ error: error.message })
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    static accederPerfil = async function (req: Request , res: Response) {
        
        res.json(req.veterinario)
    }

    static olvidePasword= async function (req: Request , res: Response) {
            try {
                //creamos un nuvo token para el usuario para enviarlo por email
                req.veterinario.token= generarId()
                await req.veterinario.save()

                //!enviamos email
                gerarNuevoPassword(req.veterinario)


                res.json({msg: ' Hemos enviado un email con las intrucciones'})
                
            } catch (error) {
                console.log(error)
            }
    }

    static comprobarToken= async function (req: Request , res: Response) {
             res.json({msg: 'token valido y el usuaio Existe'})
    }

    static nuevoPasword= async function (req: Request , res: Response){
            
            const {password} = req.body
             try {
              req.veterinario.token= null
              req.veterinario.password= password
              await req.veterinario.save()
              res.json({msg: 'El password se a modificado correctamente'})

                
             } catch (error) {
                console.log(error)
             }

    }
    static actualizaPasword = async function (req: Request , res: Response){
         
        try{
             //leerr los datos
         const {_id} =req.veterinario
         const {password , passwordOld} =req.body
        
        
         const veterinario = await Veterinario.findById(_id)
         console.log(veterinario)
         if(!veterinario){ 
            const error = new Error("Usuario no encontrado")
            return res.status(400).json({msg:error.message})
         } 
            

         const esPasswordCorrecto = await veterinario.comprobarPassword(passwordOld);
        
           
          if(esPasswordCorrecto){
             veterinario.password = password
             await veterinario.save();
             res.json({msg: "Password Almacenado Correctamente!"})
          }else{
             const error = new Error("El passwor Actual es incorrecto")
             return res.status(400).json({msg: error.message})
          }

        }catch (error){
            res.status(500).json({ msg: "Error al actualizar la contraseña", error: error.message });
        }
        
        
    }

    static actualizarPerfil= async function (req: Request, res: Response){
 
        //buscamos a usuaro por el id 
        const veterinario= await Veterinario.findById(req.params.id)
        if(!veterinario){
            const error = new Error("Hubo un error")
            return res.status(400).json({msg: error.message})
        }


        const {email} = req.body
        if(veterinario.email  !== req.body.email){
            const existeEmail = await Veterinario.findOne({email})
            if(existeEmail){
                const error= new Error("El email ya esta siendo usado")
                return res.status(400).json({msg :error.message})
            }
        }
                
        try {
            veterinario.nombre= req.body.nombre 
            veterinario.email= req.body.email 
            veterinario.web= req.body.web 
            veterinario.telefono= req.body.telefono 
            
            console.log(veterinario)
            //guardamos la actualizacion del veterinario
            const veterinarioActualizado= await veterinario.save()
            res.json(veterinarioActualizado)
            
        } catch (error) {
            console.log(error)
        }
    }

}


