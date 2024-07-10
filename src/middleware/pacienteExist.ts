import { Request, Response, NextFunction } from "express";
import Paciente, { IPaciente } from "../models/Pacientes";

declare global{
    namespace Express{
        interface Request {
            paciente:IPaciente
        }
    }
}

export async function validarPacienteExiste(req: Request, res: Response,next: NextFunction){

    try {

        const { id } = req.params
        
        const pacienteExiste= await Paciente.findById({_id: req.params.id})
  
        console.log(pacienteExiste)
       
        if(!pacienteExiste){
            const error=  new Error('El paciente no existe')
            return res.status(404).json({msg: error.message})
        }

 

        if(pacienteExiste.veterinario.toString() !== req.veterinario.id.toString()){
            return res.json({msg: 'Accion no valida'});
             
         }

        req.paciente=pacienteExiste
        next()


    } catch (error) {
        console.log(error)
    }

}