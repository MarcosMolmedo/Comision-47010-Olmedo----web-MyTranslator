/* Función para obtener el nombre del usuario */
function obtenerNombre() {
    Swal.fire({
        title: 'Bienvenido a My Translator',
        text: '¿Cuál es tu nombre?',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        confirmButtonText: 'Enviar',
        showLoaderOnConfirm: true,
        preConfirm: (nombre) => {
            if (!nombre) {
                Swal.showValidationMessage('Por favor, ingresa tu nombre');
            }
            return nombre;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            var nombre = result.value;
            localStorage.setItem("nombreUsuario", nombre); // Almacenar el nombre en localStorage
            Swal.fire(
                'Gracias ' + nombre + ', por interesarte en nuestros servicios',
                '',
                'success'
            );
        }
    });
}

/* Función para mostrar el nombre del usuario en el resumen final */
function mostrarResumenConNombre(nombreUsuario, resumen) {
    Swal.fire({
        title: 'Resumen de Cotización',
        html: `Hola ${nombreUsuario}, recibirás un correo electrónico con la información solicitada.<br>${resumen}`,
        confirmButtonText: 'Aceptar',
    });
}

/* Función para controlar el video inicial del index */
function controlarVideo() {
    const video = document.querySelector(".video");

    video.addEventListener("loadedmetadata", function() {
        video.currentTime = 3;
        video.play();
    });
}

/* Función para realizar la cotización de clases */
function realizarCotizacionClases(idioma) {
    Swal.fire({
        title: "¿Qué tipo de clase desea?",
        input: "select",
        inputOptions: {
            '1': 'Clases Individuales',
            '2': 'Clases Grupales'
        },
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
    }).then((tipoClaseResult) => {
        if (tipoClaseResult.isConfirmed) {
            const tipoClase = tipoClaseResult.value;
            Swal.fire({
                title: "Seleccione el paquete deseado:",
                input: "select",
                inputOptions: {
                    '1': 'Paquete de 5 clases',
                    '2': 'Paquete de 10 clases',
                    '3': 'Paquete de 15 clases'
                },
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then((paqueteResult) => {
                if (paqueteResult.isConfirmed) {
                    const paquete = paqueteResult.value;
                    const { costo, descripcion, cantidadClases } = calcularCostoClase(tipoClase, paquete);
                    mostrarResumenConNombre(localStorage.getItem("nombreUsuario"), `
                        Tipo de Clase: ${descripcion}<br>
                        Cantidad de Clases: ${cantidadClases}<br>
                        Costo Total: ${costo} euros
                    `);
                } else if (paqueteResult.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Acción cancelada.", "", "info");
                }
            });
        } else if (tipoClaseResult.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Acción cancelada.", "", "info");
        }
    });
}

/* Función para realizar la cotización de traducciones */
function realizarCotizacionTraducciones() {
    Swal.mixin({
        progressSteps: ['1', '2', '3', '4', '5', '6'],
    }).queue([
        {
            title: '¿De qué idioma a qué idioma desea traducir?',
            input: 'select',
            inputOptions: {
                'ingles-espanol': 'Inglés a Español',
                'espanol-ingles': 'Español a Inglés'
            },
        },
        {
            title: '¿Qué tipo de documento desea traducir?',
            input: 'select',
            inputOptions: {
                '1': 'Jurídico',
                '2': 'Otros'
            },
        },
        {
            title: '¿A dónde va a presentar la traducción?',
            input: 'select',
            inputOptions: {
                '1': 'Municipalidad',
                '2': 'Centro Educativo',
                '3': 'Otros'
            },
        },
        {
            title: '¿Para cuándo necesita la traducción?',
            input: 'select',
            inputOptions: {
                '1': '7 días',
                '2': '14 días',
                '3': '+21 días'
            },
        },
        {
            title: '¿Cuántas fojas tiene que traducir?',
            input: 'select',
            inputOptions: {
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
                '6': '6',
                '7': '7',
                '8': '8',
                '9': '9',
                '10': '10'
            },
        },
        {
            title: '¿Necesita apostillar su documento?',
            input: 'select',
            inputOptions: {
                '1': 'Sí',
                '2': 'No'
            },
        }
    ]).then((result) => {
        if (result.value) {
            const answers = result.value;
            const idioma = answers[0];
            const tipoDocumento = answers[1];
            const lugarPresentacion = answers[2];
            const fechaNecesidad = answers[3];
            const cantidadFojas = answers[4];
            const apostillar = answers[5];

            // Convertir respuestas numéricas en texto
            const idiomaTexto = (idioma === 'ingles-espanol') ? 'Inglés a Español' : 'Español a Inglés';
            const tipoDocumentoTexto = (tipoDocumento === '1') ? 'Jurídico' : 'Otros';
            const lugarPresentacionTexto = (lugarPresentacion === '1') ? 'Municipalidad' : ((lugarPresentacion === '2') ? 'Centro Educativo' : 'Otros');
            const fechaNecesidadTexto = (fechaNecesidad === '1') ? '7 días' : ((fechaNecesidad === '2') ? '14 días' : '+21 días');
            const cantidadFojasTexto = cantidadFojas;
            const apostillarTexto = (apostillar === '1') ? 'Sí' : 'No';

            mostrarResumenConNombre(localStorage.getItem("nombreUsuario"), `
                De Idioma a Idioma: ${idiomaTexto}<br>
                Tipo de Documento: ${tipoDocumentoTexto}<br>
                Lugar de Presentación: ${lugarPresentacionTexto}<br>
                Fecha de Necesidad: ${fechaNecesidadTexto}<br>
                Cantidad de Fojas: ${cantidadFojasTexto}<br>
                Apostillar: ${apostillarTexto}
            `);
        }
    });
}

/* Función para calcular el costo de las clases */
function calcularCostoClase(tipoClase, paquete) {
    let costoPorClase = 0;
    let cantidadClases = 0;
    let descripcion = "";

    if (tipoClase === '1') {
        costoPorClase = 25;
        descripcion += "Tipo de Clase: Clases Individuales";
    } else if (tipoClase === '2') {
        costoPorClase = 35;
        descripcion += "Tipo de Clase: Clases Grupales";
    }

    switch (paquete) {
        case '1':
            cantidadClases = 5;
            descripcion += " - Paquete de 5 clases.";
            break;
        case '2':
            cantidadClases = 10;
            descripcion += " - Paquete de 10 clases con 10% de descuento.";
            costoPorClase *= 0.9; // Aplicar descuento del 10%
            break;
        case '3':
            cantidadClases = 15;
            descripcion += " - Paquete de 15 clases con 15% de descuento.";
            costoPorClase *= 0.85; // Aplicar descuento del 15%
            break;
        default:
            descripcion += " - Opción de paquete no válida. Se calculará el precio por clase individual.";
            cantidadClases = 1;
            break;
    }

    const costoTotal = costoPorClase * cantidadClases;
    descripcion += `<br>Precio por Clase: ${costoPorClase} euros`;
    descripcion += `<br>Cantidad de Clases: ${cantidadClases}`;
    descripcion += `<br>Costo Total: ${costoTotal} euros`;

    return { costo: costoTotal, descripcion, cantidadClases };
}

document.addEventListener("DOMContentLoaded", function() {
    // Recuperar el nombre del usuario del localStorage si está almacenado
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    if (nombreUsuario) {
        // Si el nombre del usuario está almacenado, mostrar un mensaje de bienvenida personalizado
        Swal.fire(
            'Bienvenido de nuevo, ' + nombreUsuario,
            '¿En qué podemos ayudarte hoy?',
            'info'
        );
    } else {
        // Si el nombre del usuario no está almacenado, solicitarlo
        obtenerNombre();
    }

    const cotizarBtn = document.getElementById("cotizarBtn");

    cotizarBtn.addEventListener("click", function() {
        Swal.mixin({
            progressSteps: ['1', '2', '3', '4', '5', '6'],
        }).queue([
            {
                title: 'Idioma de Interpretación',
                input: 'select',
                inputOptions: {
                    'ingles-espanol': 'Inglés a Español',
                    'espanol-ingles': 'Español a Inglés'
                },
            },
            {
                title: 'País de Interpretación',
                input: 'select',
                inputOptions: {
                    'netherlands': 'Netherlands',
                    'argentina': 'Argentina',
                    'ue': 'Otro país de la UE',
                    'otros': 'Otros'
                },
            },
            {
                title: 'Tipo de Interpretación',
                input: 'select',
                inputOptions: {
                    'juridica': 'Jurídica',
                    'turismo': 'Turismo',
                    'congreso-medico': 'Congreso Médico',
                    'casamiento': 'Casamiento',
                    'otros': 'Otros'
                },
            },
            {
                title: 'Duración del Evento',
                input: 'select',
                inputOptions: {
                    '2-horas': '2 horas',
                    '4-horas': '4 horas',
                    '6-horas': '6 horas',
                    '8-horas': '8 horas',
                    'mas-8-horas': '+8 horas'
                },
            },
            {
                title: 'Email',
                input: 'email',
                inputAttributes: {
                    autocapitalize: 'off'
                },
            }
        ]).then((result) => {
            if (result.value) {
                const answers = result.value;
                const resumen = `
                    Idioma de Interpretación: ${answers[0]}<br>
                    País de Interpretación: ${answers[1]}<br>
                    Tipo de Interpretación: ${answers[2]}<br>
                    Duración del Evento: ${answers[3]}<br>
                    Email: ${answers[4]}
                `;

                mostrarResumenConNombre(localStorage.getItem("nombreUsuario"), resumen);
            }
        });
    });
});

/* Event Listeners */

document.addEventListener("DOMContentLoaded", function() {
    const clasesBtn = document.getElementById("clasesBtn");
    const traduccionesBtn = document.getElementById("traduccionesBtn");

    clasesBtn.addEventListener("click", function() {
        Swal.fire({
            title: "¿Qué idioma desea aprender?",
            input: "select",
            inputOptions: {
                '1': 'Inglés',
                '2': 'Español'
            },
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((idiomaResult) => {
            if (idiomaResult.isConfirmed) {
                const idioma = idiomaResult.value;
                realizarCotizacionClases(idioma);
            } else {
                Swal.fire("Acción cancelada.", "", "info");
            }
        });
    });

    traduccionesBtn.addEventListener("click", function() {
        realizarCotizacionTraducciones();
    });
});

/* Video */
window.onload = controlarVideo;

