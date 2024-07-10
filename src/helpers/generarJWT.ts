
import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario";

const generatJWT= (id:object) => {
   return jwt.sign({id},process.env.JWT_SECRET,{
       expiresIn:"30d"
   })
}

export default generatJWT;