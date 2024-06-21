import { Router } from 'express'
import { readIngredientes, saveIngredientes } from '../utils/ing.js';
import { writeFile } from 'fs/promises';


const app = Router()

const fileIngredientes = './data/ingredientes.json';

app.post('/agregarIngredientes', async (req, res) => {
    const { name } = req.body;

    try {
        const ingredientes = await readIngredientes();

        const ingredienteExistente = ingredientes.find(ing => ing.name === name);
        if (ingredienteExistente) {
            return res.status(400).json({ status: false, message: 'El ingrediente ya existe.' });
        }
        
        const nuevoIngrediente = {
            id: ingredientes.length + 1,
            name
        };
        ingredientes.push(nuevoIngrediente);

        await saveIngredientes(ingredientes);

        res.status(201).json({ status: true, message: 'Ingrediente agregado correctamente.', ingrediente: nuevoIngrediente });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Error interno del servidor.' });
    }
});

app.get('/todosIngredientes', async (req, res) => {
    try {
        const ingredientes = await readIngredientes(fileIngredientes);
        if (ingredientes) {
            res.status(200).json(ingredientes);
        } else {
            res.status(404).json({ status: false, message: 'No se encontraron ingredientes.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Error interno del servidor.' });
    }
});

export default app