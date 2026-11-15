/*
Actividad 2: Tecnologías JavaScript y AJAX
Fundación Universitaria Internacional de la Rioja
Desarrollo de Aplicaciones en Red
Felipe Jimenez Melguizo
2026.11.14
*/

document.addEventListener("DOMContentLoaded", () => {
  // Funciones Auxiliares comunes

  /**
   * Actualiza la caja de resultado aplicando la clase visual correspondiente.
   * @param {HTMLElement} contenedor - Elemento del DOM donde se muestra el mensaje.
   * @param {string} mensaje - Texto a renderizar.
   * @param {"success" | "error" | "neutral"} estado - Estilo visual de la caja.
   */
  function mostrarResultado(contenedor, mensaje, estado = "neutral") {
    contenedor.textContent = mensaje;
    contenedor.classList.remove("result-success", "result-error");

    if (estado === "success") {
      contenedor.classList.add("result-success");
    } else if (estado === "error") {
      contenedor.classList.add("result-error");
    }
  }

  /**
   * Convierte a minúsculas y elimina tildes/diéresis manteniendo la ñ intacta.
   * @param {string} texto
   * @returns {string}
   */
  function quitarTildes(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /*
  EJERCICIO 1: Detectar si la cadena es un Palíndromo
  */
  const formPalindromo = document.getElementById("form-palindromo");
  const inputPalindromo = document.getElementById("input-palindromo");
  const resPalindromo = document.getElementById("res-palindromo");

  formPalindromo.addEventListener("submit", (event) => {
    event.preventDefault();
    const original = inputPalindromo.value.trim();

    if (!original) {
      mostrarResultado(
        resPalindromo,
        "Por favor introduce una palabra o frase.",
        "error",
      );
      return;
    }

    // Limpieza de espacios, acentos y signos de puntuación
    const limpia = quitarTildes(original).replace(/[^a-z0-9ñ]/g, "");

    if (!limpia) {
      mostrarResultado(
        resPalindromo,
        "La entrada debe contener al menos una letra o número.",
        "error",
      );
      return;
    }

    const invertida = limpia.split("").reverse().join("");

    if (limpia === invertida) {
      mostrarResultado(
        resPalindromo,
        `"${original}" SÍ es un palíndromo.`,
        "success",
      );
    } else {
      mostrarResultado(
        resPalindromo,
        `"${original}" NO es un palíndromo.`,
        "error",
      );
    }
  });

  /*
  EJERCICIO 2: Mayor de dos Números
  */
  const formMayor = document.getElementById("form-mayor");
  const inputNum1 = document.getElementById("input-num1");
  const inputNum2 = document.getElementById("input-num2");
  const resMayor = document.getElementById("res-mayor");

  formMayor.addEventListener("submit", (event) => {
    event.preventDefault();
    const valor1 = inputNum1.value.trim();
    const valor2 = inputNum2.value.trim();

    if (valor1 === "" || valor2 === "") {
      mostrarResultado(
        resMayor,
        "Debes completar ambos campos numéricos.",
        "error",
      );
      return;
    }

    const num1 = Number(valor1);
    const num2 = Number(valor2);

    if (Number.isNaN(num1) || Number.isNaN(num2)) {
      mostrarResultado(
        resMayor,
        "Uno de los valores introducidos no es un número válido.",
        "error",
      );
      return;
    }

    if (num1 > num2) {
      mostrarResultado(
        resMayor,
        `El número mayor es ${num1} (${num1} > ${num2}).`,
        "success",
      );
    } else if (num2 > num1) {
      mostrarResultado(
        resMayor,
        `El número mayor es ${num2} (${num2} > ${num1}).`,
        "success",
      );
    } else {
      mostrarResultado(
        resMayor,
        `Ambos números son iguales (${num1} = ${num2}).`,
        "success",
      );
    }
  });

  /*
  EJERCICIO 3: Mostrar las vocales que aparecen en una cadena
  */
  const formVocalesPresentes = document.getElementById(
    "form-vocales-presentes",
  );
  const inputCadenaVocales = document.getElementById("input-cadena-vocales");
  const resVocalesPresentes = document.getElementById("res-vocales-presentes");

  formVocalesPresentes.addEventListener("submit", (event) => {
    event.preventDefault();
    const texto = inputCadenaVocales.value.trim();

    if (!texto) {
      mostrarResultado(
        resVocalesPresentes,
        "Por favor, introduce una cadena de texto.",
        "error",
      );
      return;
    }

    const normalizado = quitarTildes(texto);
    const vocalesBase = ["a", "e", "i", "o", "u"];
    const encontradas = vocalesBase.filter((vocal) =>
      normalizado.includes(vocal),
    );

    if (encontradas.length === 0) {
      mostrarResultado(
        resVocalesPresentes,
        "No se encontraron vocales en la cadena.",
        "neutral",
      );
    } else {
      mostrarResultado(
        resVocalesPresentes,
        `Vocales presentes (${encontradas.length}): ${encontradas.join(", ").toUpperCase()}`,
        "success",
      );
    }
  });

  /*
  EJERCICIO 4: COntar la frecuencia de aparición de cada vocal
  */
  const formConteoVocales = document.getElementById("form-conteo-vocales");
  const inputCadenaConteo = document.getElementById("input-cadena-conteo");
  const resConteoVocales = document.getElementById("res-conteo-vocales");

  formConteoVocales.addEventListener("submit", (event) => {
    event.preventDefault();
    const texto = inputCadenaConteo.value.trim();

    if (!texto) {
      mostrarResultado(
        resConteoVocales,
        "Por favor, introduce una cadena de texto.",
        "error",
      );
      return;
    }

    const normalizado = quitarTildes(texto);
    const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };

    for (const caracter of normalizado) {
      if (Object.hasOwn(conteo, caracter)) {
        conteo[caracter]++;
      }
    }

    const resumen = Object.entries(conteo)
      .map(([vocal, cantidad]) => `${vocal.toUpperCase()}: ${cantidad}`)
      .join(" | ");

    const total = Object.values(conteo).reduce((acc, n) => acc + n, 0);

    mostrarResultado(
      resConteoVocales,
      `${resumen} (Total: ${total} vocales)`,
      "success",
    );
  });
});
