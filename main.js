/* Estilo video inicial del index */
/* video-control.js */
function controlarVideo() {
    var video = document.querySelector(".video");

    video.addEventListener("loadedmetadata", function() {
        video.currentTime = 3;
        video.play();
    });

    video.addEventListener("ended", function() {
        video.currentTime = 3;
        video.play();
    });
}

/* Interacción para HTML cotizaciones */
/*interacion para que el usuario seleccione tipo de clase, se declara function*/
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
/*interacion para que el usuario seleccione tipo de traduccion, se declara function*/
    traduccionesBtn.addEventListener("click", function() {
        realizarCotizacionTraducciones();
    });

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

                        Swal.fire({
                            title: "Resumen Final",
                            html: `Tipo de Clase: ${descripcion}<br>Cantidad de Clases: ${cantidadClases}<br>Costo Total: ${costo} euros`,
                            confirmButtonText: "Aceptar",
                        });
                    } else if (paqueteResult.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire("Acción cancelada.", "", "info");
                    }
                });
            } else if (tipoClaseResult.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Acción cancelada.", "", "info");
            }
        });
    }
/*interacion para que el usuario seleccione tipo de traduccion*/
    function realizarCotizacionTraducciones() {
        Swal.mixin({
            progressSteps: ['1', '2', '3', '4', '5', '6'],
        }).queue([
            {
                title: '¿De qué idioma a qué idioma desea traducir?',
                input: 'select',
                inputOptions: {
                    '1': 'Inglés a Español',
                    '2': 'Español a Inglés'
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
                Swal.fire({
                    title: 'Resumen de Respuestas',
                    html: `
                        De Idioma a Idioma: ${answers[0]}<br>
                        Tipo de Documento: ${answers[1]}<br>
                        Lugar de Presentación: ${answers[2]}<br>
                        Fecha de Necesidad: ${answers[3]}<br>
                        Cantidad de Fojas: ${answers[4]}<br>
                        Apostillar: ${answers[5]}
                    `,
                    confirmButtonText: 'Aceptar',
                });
            }
        });
    }
/*interacion para que el usuario seleccione tipo de clase*/
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
});
/*interacion para que el usuario seleccione tipo de traduccion, se declara function*/
function traducciones() {
    Swal.mixin({
      progressSteps: ['1', '2', '3', '4', '5', '6', '7'],
    }).queue([
      {
        title: '¿La traducción es de inglés a español o de español a inglés?',
        input: 'select',
        inputOptions: {
          'De inglés a español': 'De inglés a español',
          'De español a inglés': 'De español a inglés'
        },
      },
      {
        title: '¿Qué tipo de interpretación necesita?',
        input: 'select',
        inputOptions: {
          'Jurídica': 'Jurídica',
          'Razones turísticas': 'Razones turísticas',
          'Congreso médico': 'Congreso médico',
          'Reunión ejecutiva': 'Reunión ejecutiva',
          'Otro tipo de traducción': 'Otro tipo de traducción'
        },
      },
      {
        title: '¿En qué país se necesita el servicio de traducción?',
        input: 'select',
        inputOptions: {
          'Netherlands': 'Netherlands',
          'Argentina': 'Argentina',
          'Otro país de la UE': 'Otro país de la UE',
          'Otro país': 'Otro país'
        },
      },
      {
        title: '¿Cuánto tiempo durará el evento?',
        input: 'select',
        inputOptions: {
          '2 horas': '2 horas',
          '4 horas': '4 horas',
          '6 horas': '6 horas',
          '+6 horas': '+6 horas'
        },
      },
      {
        title: 'Por favor, ingrese su dirección de correo electrónico:',
        input: 'email',
        inputPlaceholder: 'example@example.com',
      },
      {
        title: '¿Desea recibir una cotización aproximada en 24 horas por email?',
        input: 'select',
        inputOptions: {
          'Sí': 'Sí',
          'No': 'No'
        },
      }
    ]).then((result) => {
      if (result.value) {
        const answers = result.value;
        const traduccion = answers[0];
        const interpretacion = answers[1];
        const pais = answers[2];
        const duracion = answers[3];
        const email = answers[4];
        const recibirCotizacion = answers[5];
  
        // Aquí puedes procesar las respuestas y mostrar un resumen final
        let resumen = `Traducción: ${traduccion}\n`;
        resumen += `Tipo de Interpretación: ${interpretacion}\n`;
        resumen += `País: ${pais}\n`;
        resumen += `Duración del Evento: ${duracion}\n`;
        resumen += `Correo Electrónico: ${email}\n`;
        resumen += `Recibir Cotización: ${recibirCotizacion === 'Sí' ? 'Sí' : 'No'}`;
  
        Swal.fire({
          title: 'Resumen de Respuestas',
          text: resumen,
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }