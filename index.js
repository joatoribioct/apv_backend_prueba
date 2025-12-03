import express from "express";
import dotenv from 'dotenv'
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacientesRoutes from "./routes/pacienteRoutes.js"
import cors from 'cors';

// Cargar variables de entorno primero
dotenv.config();

const app = express();

// Middleware de parseo ANTES de las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la BD
conectarDB();

const allowedOrigins = [
    "http://localhost:5173",
    "https://administrador-pacientes-joa.netlify.app"
];

const corsOptions = {
    origin: function(origin, callback) {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('No Permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions))
app.options("*", cors(corsOptions))

// Rutas
app.use("/api/veterinarios", veterinarioRoutes)
app.use("/api/pacientes", pacientesRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
});