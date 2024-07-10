import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId";
import { NextFunction } from "express";

//interface para crear el veterinario documente herdad de todas props
export interface IVeterinario extends Document {
  nombre: string;
  password: string;
  apellidos: string;
  email: string;
  telefono: string;
  web: string;
  token: string;
  confirmado: boolean;
 comprobarPassword:  (password:string) => Promise<boolean>
 
}

//crear la tabla den mongoose
const VeterinarioSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  telefono: {
    type: String,
    required: false,
    default:"",
    trim: true
  },
  web: {
    type: String,
    trim: true,
    default: "",
  },
  token: {
    type: String,
    trim: true,
    default: generarId //generamos un token unico
  },
  confirmado: {
    type: String,
    trim: true,
    default: false
  }
},{timestamps: true})//para saber cuando fue la utitima acutualizacion;

 //codigo antes de almacenar el registro
VeterinarioSchema.pre('save',async function(next: NextFunction){

  if(!this.isModified('password')){
    next()
  }
  const salt= await  bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string , salt)
})

//podemos crear metodos para el schema
VeterinarioSchema.methods.comprobarPassword = async function( passwordFormulario: string ) {
  return await bcrypt.compare(passwordFormulario, this.password)
        
}



//creamos el modelo el primer parametro deve ser un nombre unico y el segundo es el de nuestro schema
const Veterinario= mongoose.model<IVeterinario>('Veterinario', VeterinarioSchema); 
export default Veterinario