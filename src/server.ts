import express from 'express';
import dotenv from 'dotenv'
import  cors from 'cors'
import { corsconfig } from './config/cors';
import { connectDB } from './config/db';
import veterinarioRoutes from './routes/veterinarioRoutes'; 
import pacienteRoutes from './routes/pacienteRoutes';



dotenv.config()//para  utilizar las varibles de entorno

connectDB()
const app= express();

//usar la configuración de cors 
app.use(cors(corsconfig))

//abilitamos la lectura de Json
app.use(express.json());

//routes
app.use('/api/veterinarios',veterinarioRoutes)
app.use('/api/pacientes',pacienteRoutes)
 

export default app