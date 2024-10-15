const diccionario = {
    "computadora": ["Ordenador", "procesador", "cerebro electrónico"],
    "correr": ["trotar", "acelerar", "apresurar"],
    "jugar": ["juguetear", "divertirse", "entretenerse"],
    "charlar": ["hablar", "conversar", "dialogar"],
    "económico": ["ahorrador", "moderado", "barato"],
    "derrota": ["fracaso", "caída", "pérdida"],
    "oscuridad": ["sombras", "noche", "tinieblas"],
    "viejo": ["anciano", "veterano", "arcaico"],
    "fácil": ["sencillo", "simple", "claro"],
    "frío": ["gélido", "frígido", "helado"],
    "triste": ["melancólico", "desolado", "abatido"],
    "videojuegos": ["juegos electrónicos", "juegos de consola", "juegos de arcade"],
    "agua": ["líquido", "fluido", "caldo"],
    "maestro": ["profesor", "docente", "instructor"],
    "mostrar": ["exhibir", "presentar", "demostrar"]
};

const analizarTexto = () => {
    const texto = document.getElementById('texto').value;
    const buscar = document.getElementById('buscar').value;

    if (texto === "" || buscar === "") {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Por favor ingresa ambos campos.',
        });
        document.getElementById('resultado').innerHTML = "";
        document.getElementById('estadisticas').innerHTML = "";
        return;
    }

    const buscarEscapado = buscar.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&');
    const regex = new RegExp(`(${buscarEscapado})`, 'gi');
    const coincidencias = texto.match(regex);

    if (coincidencias) {
        const textoResaltado = texto.replace(regex, "<mark>$1</mark>");
        document.getElementById('resultado').innerHTML = `<h3>Resultados:</h3><p>${textoResaltado}</p>`;
        document.getElementById('resultado').innerHTML += `<p><strong>Se encontraron ${coincidencias.length} coincidencia(s) para '${buscar}'.</strong></p>`;
    } else {
        Swal.fire({
            icon: 'info',
            title: 'No se encontraron coincidencias',
            text: `No se encontraron coincidencias para '${buscar}'.`,
        });
        document.getElementById('resultado').innerHTML = "";
    }

    const totalCaracteres = texto.length;
    const totalPalabras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    const totalEspacios = (texto.match(/\s/g) || []).length;
    const totalCaracteresSinEspacios = texto.replace(/\s/g, '').length;

    document.getElementById('estadisticas').innerHTML = `
        <h3>Estadísticas:</h3>
        <p><strong>Total de caracteres sin espacios:</strong> ${totalCaracteresSinEspacios}</p>
        <p><strong>Total de caracteres:</strong> ${totalCaracteres}</p>
        <p><strong>Total de palabras:</strong> ${totalPalabras}</p>
        <p><strong>Total de espacios:</strong> ${totalEspacios}</p>
    `;
};

const reemplazarPalabra = () => {
    const texto = document.getElementById('texto').value;
    const buscar = document.getElementById('buscar').value; // Cambié a 'buscar'
    const palabraReemplazo = document.getElementById('reemplazo').value; // Cambié a 'reemplazo'

    if (texto === "" || buscar === "" || palabraReemplazo === "") {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Por favor ingresa todos los campos.',
        });
        return;
    }

    // Comprobar si la palabra buscada está en el texto
    if (texto.toLowerCase().includes(buscar.toLowerCase())) {
        // Comprobar si la palabra a reemplazar está en el diccionario
        if (diccionario[palabraReemplazo]) {
            const sinonimos = diccionario[palabraReemplazo];
            // Crear un string de sinónimos para mostrar en un SweetAlert
            Swal.fire({
                title: 'Selecciona un sinónimo',
                input: 'select',
                inputOptions: sinonimos.reduce((acc, sin) => {
                    acc[sin] = sin; // Agregar cada sinónimo al objeto
                    return acc;
                }, {}),
                inputPlaceholder: 'Elige un sinónimo',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    const reemplazo = result.value; // Sinónimo elegido

                    // Reemplazar la palabra en el texto
                    const buscarEscapado = buscar.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&');
                    const regex = new RegExp(`\\b${buscarEscapado}\\b`, 'gi');
                    const nuevoTexto = texto.replace(regex, reemplazo);

                    // Actualizar el texto en el área de texto
                    document.getElementById('texto').value = nuevoTexto;

                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: `Las ocurrencias de '${buscar}' han sido reemplazadas por '${reemplazo}'.`,
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: `La palabra '${palabraReemplazo}' no tiene sinónimos en el diccionario.`,
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: `La palabra '${buscar}' no se encontró en el texto.`,
        });
    }
};

const cargarSinonimos = () => {
    const seleccionar = document.getElementById('reemplazo');
    const palabraSeleccionada = seleccionar.value;

    if (diccionario[palabraSeleccionada]) {
        // Aquí puedes realizar alguna acción si es necesario al seleccionar un sinónimo
    }
};
