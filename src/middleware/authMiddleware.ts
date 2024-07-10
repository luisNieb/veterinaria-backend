import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import Veterinario from "../models/Veterinario";


export const checkAuth = async (req: Request, res: Response, next: NextFunction)=>{
      let token: string

      if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
      try {
        token=req.headers.authorization.split(" ")[1]
        
        const decoded = jwt.verify( token, process.env.JWT_SECRET)
       

        req.veterinario = (await Veterinario.findById(decoded['id']).select(
            "-password -token -confirmado"
        ))
       
        return next()

      } catch (error) {
       const e= new Error('Token no valido')
        res.status(404).json({msg: e.message})
      }
    }

    if(!token){
        const error= new Error('Token  no valido o inexistente')
        res.status(403).json({msg: error.message})
    }
    next()
     
     
}

