/*
Actividad 2: Tecnologías JavaScript y AJAX
Fundación Universitaria Internacional de la Rioja
Desarrollo de Aplicaciones en Red
Felipe Jimenez Melguizo
2026.11.14
*/

document.addEventListener("DOMContentLoaded", () => {
  const formAjax = document.getElementById("form-ajax");
  const inputUrl = document.getElementById("url-recurso");
  const zonaEstados = document.getElementById("zona-estados");
  const zonaCodigo = document.getElementById("zona-codigo");
  const zonaCabeceras = document.getElementById("zona-cabeceras");
  const zonaContenidos = document.getElementById("zona-contenidos");

  //Diccionario de los 5 estados estándar de XMLHttpRequest
  const DESCRIPCION_ESTADOS = {
    0: "0 - UNSENT (Petición no iniciada)",
    1: "1 - OPENED (Conexión establecida con el servidor)",
    2: "2 - HEADERS_RECEIVED (Cabeceras y estado recibidos)",
    3: "3 - LOADING (Descargando cuerpo de la respuesta...)",
    4: "4 - DONE (Petición completada)",
  };

  /*
  Precarga por defecto la URL de la página actual
  */
  inputUrl.value = window.location.href;

  /**
   * Ejecuta una petición HTTP GET asíncrona hacia la URL indicada
   * y actualiza en tiempo real las 4 zonas del inspector.
   * @param {string} urlDestino
   */
  function realizarPeticionAjax(urlDestino) {
    const xhr = new XMLHttpRequest();
    const historialEstados = [];

    // Reiniciar paneles antes de lanzar la nueva petición
    zonaCodigo.classList.remove("status-ok", "status-error");
    zonaCodigo.textContent = "Consultando servidor...";
    zonaCabeceras.textContent = "Esperando cabeceras...";
    zonaContenidos.textContent = "Descargando contenido...";

    // Registrar estado inicial (0)
    historialEstados.push(DESCRIPCION_ESTADOS[xhr.readyState]);
    zonaEstados.textContent = historialEstados.join("\n");

    // Requisito 3: Escuchar cada cambio de estado de la petición
    xhr.onreadystatechange = function () {
      const descripcion =
        DESCRIPCION_ESTADOS[xhr.readyState] ||
        `${xhr.readyState} - Estado desconocido`;
      historialEstados.push(descripcion);
      zonaEstados.textContent = historialEstados.join("\n");

      // Cuando la petición llega al estado 4 (DONE), procesar respuesta completa
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // Requisito 5: Código y texto de estado HTTP
        if (xhr.status === 0) {
          zonaCodigo.textContent = "0 - Error de red o bloqueo CORS";
          zonaCodigo.classList.add("status-error");
        } else {
          const textoEstado = xhr.statusText ? ` ${xhr.statusText}` : "";
          zonaCodigo.textContent = `${xhr.status}${textoEstado}`;

          if (xhr.status >= 200 && xhr.status < 300) {
            zonaCodigo.classList.add("status-ok");
          } else {
            zonaCodigo.classList.add("status-error");
          }
        }

        // Requisito 4: Todas las cabeceras HTTP de la respuesta del servidor
        const cabeceras = xhr.getAllResponseHeaders();
        zonaCabeceras.textContent = cabeceras
          ? cabeceras.trim()
          : "No se recibieron cabeceras (petición bloqueada o sin respuesta).";

        // Requisito 2: Contenido del archivo descargado
        zonaContenidos.textContent = xhr.responseText
          ? xhr.responseText
          : "[Cuerpo de respuesta vacío]";
      }
    };

    // Manejo de fallo de red o bloqueo por política de mismo origen (CORS)
    xhr.onerror = function () {
      zonaCodigo.textContent = "Error de conexión / Bloqueo CORS";
      zonaCodigo.classList.add("status-error");
      zonaContenidos.textContent =
        "No se pudo completar la descarga. Verifica que la URL pertenezca al mismo dominio o que el servidor esté activo.";
    };

    // Abrir y enviar la petición asíncrona (true = asíncrona)
    xhr.open("GET", urlDestino, true);
    xhr.send();
  }

  // Interceptar envío del formulario para evitar recarga de página
  formAjax.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = inputUrl.value.trim();

    if (!url) {
      zonaCodigo.textContent = "URL vacía";
      zonaCodigo.classList.remove("status-ok");
      zonaCodigo.classList.add("status-error");
      zonaContenidos.textContent =
        "Introduce una URL válida antes de pulsar Mostrar Contenidos.";
      return;
    }

    realizarPeticionAjax(url);
  });
});
