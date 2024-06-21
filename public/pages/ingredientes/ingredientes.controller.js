const btnCreate = document.getElementById("create")
const listContainer = document.getElementById('list');

const puerto = 'http://localhost:3000';

const cargarIngredientes = async () => {
    try {
        const response = await fetch(`${puerto}/ing/todosIngredientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener la lista de ingredientes.');
        }
        const ingredientes = await response.json();
        console.log('Ingredientes existentes:', ingredientes);

        listContainer.innerHTML = '';

        ingredientes.forEach(ingrediente => {
            const li = document.createElement('li');
            li.textContent = `${ingrediente.name}`;
            listContainer.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener los ingredientes:', error.message);
        alert('Hubo un error al cargar los ingredientes. Por favor intenta nuevamente.');
    }
};

window.addEventListener('load', function() {
    cargarIngredientes();
});

btnCreate.addEventListener('click', async () => {
    const nombre = document.getElementById("name").value.trim();

    if (nombre === '') {
        alert('Por favor ingresa un nombre para el ingrediente.');
        return;
    }

    try {
        const response = await fetch(`${puerto}/ing/agregarIngredientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: nombre })
        });

        if (!response.ok) {
            throw new Error('No se pudo agregar el ingrediente.');
        }

        const nuevoIngrediente = await response.json();
        console.log('Ingrediente agregado con éxito:', nuevoIngrediente);

        document.getElementById("name").value = '';

        cargarIngredientes();
    } catch (error) {
        console.error('Error al agregar el ingrediente:', error.message);
        alert(' Error al agregar el ingrediente. Por favor intenta nuevamente.');
    }
});
