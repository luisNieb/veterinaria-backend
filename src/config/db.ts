import mongoose , { connection} from "mongoose";
import  colors from "colors";


export const connectDB =async ()=>{
    try {
        const connetion = await mongoose.connect(process.env.DATABASE_URL);
        const url= `${connetion.connection.host}:${connetion.connection.port}`

        console.log(colors.magenta.bold(`Connecting to mongoDB in : ${url}`))
        
    } catch (error) {
        console.log(error.message)
        process.exit(1) //termina la conexion en caso de error
        
    }
}

