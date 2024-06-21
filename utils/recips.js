import { readFile, writeFile } from 'fs/promises' 

const fileRecetas = await readFile('./data/recetas.json', 'utf-8') 
const recetasItems = JSON.parse(fileRecetas)

const fileRecips = './data/recetas.json';

export const readRecetas = async () => {
    try {
        const fileRecetas = await readFile('./data/recetas.json', 'utf-8');
        const recetasItems = JSON.parse(fileRecetas);
        return recetasItems;
    } catch (error) {
        console.log('Error al leer el archivo de recetas:', error);
        throw error;
    }
}

export const saveRecetas = async (recetas) => {
    try {
        await writeFile(fileRecips, JSON.stringify(recetas, null, 2));
    } catch (error) {
        console.log('Error al escribir en el archivo de recetas:', error);
        throw error;
    }
};
