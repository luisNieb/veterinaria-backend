import express from 'express'
import { body, param } from "express-validator"; //npm i express-validator
import { PacienteController } from '../controllers/pacienteController'
import { handelInpurtErrors } from '../middleware/validation';
import { checkAuth } from '../middleware/authMiddleware';
import { validarPacienteExiste } from '../middleware/pacienteExist';

const router= express.Router()

// nombre: string;
//     propietario: string;
//     email:string;
//     telefono:string
//     fecha:Date;
//     sintomas:string;
//     veterinario: PopulatedDoc<IVeterinario & Document>


router.post('/',
    
     body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
     body('propietario').notEmpty().withMessage('El nombre es obligatorio'),
     body('email').notEmpty().withMessage('El email es obligatorio'),
     body('telefono').notEmpty().withMessage('El telefono es obligatorio'),
    // body('fecha').notEmpty().withMessage('La fecha es obligatorio'),
     body('sintomas').notEmpty().withMessage('Los sintoms son obligatorios'),
     handelInpurtErrors,
     checkAuth, 

     PacienteController.agregarPaciente
)

router.get('/',
    checkAuth,
    PacienteController.obtenerPaciente
)


//router.param('id',validarPacienteExiste)
router.get('/:id',
    checkAuth,
    validarPacienteExiste,
    PacienteController.obtenerPacienteById
)
router.put('/:id',
    checkAuth,
    validarPacienteExiste,
    PacienteController.actualizarPaciente
)
router.delete('/:id', 
    checkAuth,
    validarPacienteExiste,
    PacienteController.eliminarPaciente)



export default router