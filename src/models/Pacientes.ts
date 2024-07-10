import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import Veterinario, { IVeterinario } from "./Veterinario";


export interface IPaciente extends Document {
    nombre: string;
    propietario: string;
    email:string;
    telefono:string;
    fecha:Date;
    sintomas:string;
    veterinario: Types.ObjectId
}

const PacienteSchema:Schema =new Schema({
      nombre:{
        type: String,
        required: true,
        trim: true,
      },
      propietario:{
        type: String,
        required: true,
        trim: true,
      },
      email:{
        type: String,
        required: true,
        trim: true,
      },
      telefono:{
        type: String,
        required: true,
        trim: true,
      },
      fecha:{
        type: Date,
        required: true,
        default:Date.now(),
      },
      sintomas:{
        type: String,
        required: true,

      },
      veterinario:{
        type: Types.ObjectId,//referencia al veterinario
        ref:'Veterinario'
      }

},{timestamps:true})

const Paciente=mongoose.model<IPaciente>('Paciente',PacienteSchema)
export default Paciente