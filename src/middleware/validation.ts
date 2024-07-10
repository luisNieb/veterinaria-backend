import { NextFunction, Request, Response } from "express";
import {validationResult} from "express-validator"


export const handelInpurtErrors=( req: Request, res: Response , next: NextFunction ) =>{
    let errors=validationResult(req)//revisa que no existan erroeres en la requet en dada caso se guardan en errors
    // si errors no esta vacio lanza retorna un error en manera de array
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //continua a la siguiente linea
    next()
}