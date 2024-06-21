import express from 'express'
import cors from 'cors';

const app = express()

const port = 3000

app.use(cors());

app.use(express.json())

import ingRouter from './routes/ing.routes.js'
import recetasRouter from './routes/recipes.routes.js'


app.listen(port, ()=>{
    console.log(`Servidor levantado en el puerto ${port}`)
})

app.use(express.static('./public'))

/* Rutas */
app.use('/ing', ingRouter)
app.use('/recetas', recetasRouter)


/*Generico*/
app.get('/', (req, res) =>{
    res.send('Hola Mundo')
}) 
app.get('/test', (req, res) =>{
    res.send('muy bien lichita')
}) 