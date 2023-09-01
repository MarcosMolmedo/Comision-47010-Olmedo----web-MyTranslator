/*estilo video inicial del index*/
/* video-control.js*/
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

/* interacion para html cotizaciones*/
function realizarInteraccion() {
  let nombre = prompt("Ingrese su nombre");
  alert("Bienvenido/a a My Translator, " + nombre);

  alert("¡Soy una lingüista y traductora. Responde algunas preguntas para conocer qué servicios te interesan.");

  function preguntarServicio(servicio) {
      return prompt(`¿Necesitas servicios de ${servicio}? (Si/No)`).toLowerCase() === 'si';
  }

  let contador = 0;
  const servicios = ["traducción", "interpretación", "clases de inglés"];
  const intereses = [];

  while (contador < servicios.length) {
      if (preguntarServicio(servicios[contador])) {
          intereses.push(servicios[contador]);
          alert(`Ofrezco servicios de ${servicios[contador]} profesional en inglés y español`);
      }
      contador++;
  }

  let costoClases = 0;
  let tipoClases = "";

  function elegirTipoClases() {
      tipoClases = prompt("Elige el tipo de clases: Grupales, Individuales o Personalizadas").toLowerCase();

      switch (tipoClases) {
          case "grupales":
              costoClases = 15;
              break;
          case "individuales":
              costoClases = 25;
              break;
          case "personalizadas":
              costoClases = 30;
              break;
          default:
              alert("Opción no válida, se tomará el costo de clases grupales por defecto.");
              tipoClases = "grupales";
              costoClases = 15;
              break;
      }
  }

  if (intereses.includes("clases de inglés")) {
      elegirTipoClases();
  } else {
      alert("No seleccionaste clases de inglés. ¡Hasta luego!");
  }

  const horariosRespuesta = {
      lunesAViernes: "9:00 AM - 6:00 PM",
      sabados: "10:00 AM - 2:00 PM"
  };

  let horarioSeleccionado = prompt("Selecciona un horario de respuesta: Lunes a Viernes o Sábados").toLowerCase();

  if (horariosRespuesta[horarioSeleccionado]) {
      alert(`Nuestro horario de respuesta es: ${horariosRespuesta[horarioSeleccionado]}`);
  } else {
      alert("Horario no válido, se tomará el horario de respuesta por defecto (Lunes a Viernes).");
      horarioSeleccionado = "lunesAViernes";
  }

  if (intereses.length === 0) {
      alert("No seleccionaste ningún servicio. ¡Hasta luego!");
  } else {
      alert(`Gracias por responder el cuestionario, ${nombre}. Has mostrado interés en los siguientes servicios: ${intereses.join(", ")}.`);
      if (tipoClases) {
          alert(`Resumen de tu selección:\nNombre: ${nombre}\nServicios de interés: ${intereses.join(", ")}\nTipo de clases: ${tipoClases}\nCosto de clases: ${costoClases} euros\nHorario de respuesta: ${horariosRespuesta[horarioSeleccionado]}`);
      }
  }
}