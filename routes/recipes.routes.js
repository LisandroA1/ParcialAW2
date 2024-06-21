import { Router } from 'express'
import { readRecetas, saveRecetas } from '../utils/recips.js'

const app = Router()

const filerecips = './data/recetas.json';

app.post('/agregarRecetas', async (req, res) => {
    const { nombre, ingredientes } = req.body;

    try {
        const recetas = await readRecetas();

        const nuevoIdReceta = recetas.length > 0 ? recetas[recetas.length - 1].id + 1 : 1;

        const ingredientesAjustados = ingredientes.map(ingrediente => ({
            idIngrediente: ingrediente.idIngrediente,
            cantidad: ingrediente.cantidad
        }));        

        const nuevaReceta = {
            id: nuevoIdReceta,
            nombre,
            ingredientes: ingredientesAjustados
        };

        recetas.push(nuevaReceta);

        await saveRecetas(recetas);

        res.status(201).json({ status: true, message: 'Receta agregada correctamente.', receta: nuevaReceta });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Error interno del servidor.' });
    }
});

app.get('/todasRecetas', async (req, res) => {
    try {
        const recetas = await readRecetas(filerecips);
        if (recetas) {
            res.status(200).json(recetas);
        } else {
            res.status(404).json({ status: false, message: 'No se encontraron recetas.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Error interno del servidor.' });
    }
});

export default app