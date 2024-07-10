import { Router } from "express";

import { body, param } from "express-validator"; //npm i express-validator
import { handelInpurtErrors } from "../middleware/validation";
import { VeterinarioController } from "../controllers/VetrinarioController";
import {
  autenticarVeterinarioExists,
  validarToken,
  validarVeterinarioExists
} from "../middleware/veterinarioExist";
import { checkAuth } from "../middleware/authMiddleware";
//   nombre: string;
//   password: string;
//   apellidos: string;
//   email: string;
//   telefono: string;
//   web: string;
//   token: string;
//   confirmado: boolean;

const router = Router();

router.post(
  "/",
  //implementamos validacion con express validator
  body("nombre").notEmpty().withMessage("El nombre del usuario es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("El password del usuario es obligatorio"),
  body("email").notEmpty().withMessage("El email del usuario es obligatorio"),
  handelInpurtErrors,
  validarVeterinarioExists,
  VeterinarioController.createVeterinario
);

router.param("token", validarToken);
router.get("/confirmar/:token", VeterinarioController.confirmarCuenta);

router.post(
  "/login",

  body("password")
    .notEmpty()
    .withMessage("El password del usuario es obligatorio"),
  body("email").notEmpty().withMessage("El email del usuario es obligatorio"),
  handelInpurtErrors,
  autenticarVeterinarioExists,
  VeterinarioController.autenticar
);

router.post('/olvide-password',
  body("email").notEmpty().withMessage("El email del usuario es obligatorio"),
  handelInpurtErrors,
  autenticarVeterinarioExists,
  
  VeterinarioController.olvidePasword)


router.get('/olvide-password/:token', VeterinarioController.comprobarToken)

router.post('/olvide-password/:token' ,VeterinarioController.nuevoPasword)


// area privada soda aceden por medio de json token
router.get("/perfil",
  //middlelware que verifica que tenga un token valido
  checkAuth, 
  VeterinarioController.accederPerfil
);

router.put("/perfil/:id",
  checkAuth,
 // autenticarVeterinarioExists,
  VeterinarioController.actualizarPerfil
)
router.put("/actualizar-password",
   checkAuth,
   VeterinarioController.actualizaPasword)


export default router;
