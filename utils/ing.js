import { readFile, writeFile } from 'fs/promises';

const fileIngrediente = './data/ingredientes.json';

export const readIngredientes = async () => {
    try {
        const fileIngredientes = await readFile(fileIngrediente, 'utf-8');
        const ingredientesItems = JSON.parse(fileIngredientes);
        return ingredientesItems;
    } catch (error) {
        console.log('Error al leer el archivo de ingredientes:', error);
        throw error;
    }
};

export const saveIngredientes = async (ingredientes) => {
    try {
        await writeFile(fileIngrediente, JSON.stringify(ingredientes, null, 2));
    } catch (error) {
        console.log('Error al escribir en el archivo de ingredientes:', error);
        throw error;
    }
};