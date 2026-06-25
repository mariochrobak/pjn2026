import express from 'express';
import cors from 'cors';
import { initDB } from './database/db';
import expedienteRoutes from './routes/expediente.routes';
import organismoRoutes from './routes/organismo.routes';
import personaRoutes from './routes/persona.routes';
import estadisticasRoutes from './routes/estadisticas.routes';
import maestrosRoutes from './routes/maestros.routes';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.use('/api/organismos', organismoRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/expedientes', expedienteRoutes); 
app.use('/api/estadisticas', estadisticasRoutes);
app.use('/api', maestrosRoutes);


initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Error al inicializar la base de datos:", error);
});