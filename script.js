document.addEventListener("DOMContentLoaded", () => {
  const gato = document.getElementById("gato");
  const estado = document.getElementById("estado");
  const reiniciar = document.getElementById("reiniciar");

  let turno = "X";
  let celdas = Array(9).fill(null);

  function crearTablero() {
    gato.innerHTML = "";
    celdas = Array(9).fill(null);
    turno = "X";
    estado.textContent = "Turno de X";

    for (let i = 0; i < 9; i++) {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      celda.dataset.index = i;
      celda.addEventListener("click", jugar);
      gato.appendChild(celda);
    }
  }

  function jugar(e) {
    const index = e.target.dataset.index;

    if (celdas[index] || obtenerGanador()) return;

    celdas[index] = turno;
    e.target.textContent = turno;

    const ganador = obtenerGanador();
    if (ganador) {
      estado.textContent = `Ganó ${ganador}`;
    } else if (!celdas.includes(null)) {
      estado.textContent = "Empate";
    } else {
      turno = turno === "X" ? "O" : "X";
      estado.textContent = `Turno de ${turno}`;
    }
  }

  function obtenerGanador() {
    const combinaciones = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of combinaciones) {
      if (celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]) {
        return celdas[a];
      }
    }
    return null;
  }

  reiniciar.addEventListener("click", crearTablero);
  crearTablero();
});
