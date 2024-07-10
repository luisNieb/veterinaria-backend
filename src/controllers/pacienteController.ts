import type { Request, Response } from "express";
import Paciente from "../models/Pacientes";

export class PacienteController {
  static agregarPaciente = async (req: Request, res: Response) => {
    const paciente = new Paciente(req.body);

    paciente.veterinario = req.veterinario.id;

    try {
      const pacienteAlmacenado = await paciente.save();
      res.json(pacienteAlmacenado);
    } catch (error) {
      const e = new Error("Failed to save paciente");
      console.log(e);
    }
  };

  static obtenerPaciente = async (req: Request, res: Response) => {
    const pacintes = await Paciente.find()
      .where("veterinario")
      .equals(req.veterinario);
    res.json(pacintes);
  };

  static obtenerPacienteById = async (req: Request, res: Response) => {
          res.json(req.paciente)
  };

  static actualizarPaciente = async (req: Request, res: Response) => {
        
        const{nombre, propietario,email,fecha, telefono,sintomas} = req.body

        //actualizar paciente
        req.paciente.nombre= nombre || req.paciente.nombre
        req.paciente.email= email || req.paciente.email
        req.paciente.fecha= fecha || req.paciente.fecha
        req.paciente.propietario= propietario || req.paciente.propietario
        req.paciente.telefono= telefono || req.paciente.telefono
        req.paciente.sintomas= sintomas || req.paciente.sintomas

        try{
          const pacienteActualizado= await req.paciente.save()
         res.json(pacienteActualizado)
        }catch(err){
           console.log(err)
        }

  };


  static eliminarPaciente = async (req: Request, res: Response) => {
  
          try {
            await req.paciente.deleteOne();
            res.json({msg: 'El paciente a sido eliminado'})
            
          } catch (error) {
            console.log(error)
          }
    
        };
}
