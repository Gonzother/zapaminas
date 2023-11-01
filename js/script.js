//Array del juego
let minaArray = new Array(18);
for (let i = 0; i < minaArray.length; i++) {
  minaArray[i] = new Array(18);
}

//Numero de minas
let nMinas = Math.floor(Math.random() * (100 - 50) + 50);

//Elementos
const contador = document.getElementById("contador");
contador.textContent = nMinas;
const section = document.getElementById("section");

const abandonar = document.getElementById("abandonar");

section.addEventListener("click", (event) => {});

//Abandonar juego e iniciar uno nuevo
const nuevoJuego = () => {
  document.location.reload();
};
abandonar.addEventListener("click", nuevoJuego);

//Carga botones
const cargaBotones = () => {
  let fragment = document.createDocumentFragment();

  //Generacion botones
  for (let i = 0; i < minaArray.length; i++) {
    for (let j = 0; j < minaArray[i].length; j++) {
      let newButton = document.createElement("BUTTON");
      newButton.classList.add("button");
      fragment.append(newButton);
      minaArray[i][j] = newButton;
    }
  }
  section.append(fragment);
};

//Asignacion minas
const asignaMinas = () => {
  for (let i = 0; i < nMinas; i++) {
    let x, y;

    do {
      x = Math.floor(Math.random() * 18);
      y = Math.floor(Math.random() * 18);
    } while (minaArray[x][y].value === "mina");

    minaArray[x][y].value = "mina";
    minaArray[x][y].classList.add("rojo");
  }
};
//Asignacion numeros
const asignaNumeros = () => {
  //Asignacion numeros
  let contador = 0;
  for (let i = 0; i < minaArray.length; i++) {
    for (let j = 0; j < minaArray[i].length; j++) {
      if (minaArray[i][j].value != "mina") {
        //Si no es la primera fila
        if (i > 0) {
          //Y no es la primera columna
          if (j > 0) {
            if (minaArray[i - 1][j - 1].value === "mina") {
              contador++;
            }
          }
          //Y no es la ultima columna
          if (j < 17) {
            if (minaArray[i - 1][j + 1].value === "mina") {
              contador++;
            }
          }
          if (minaArray[i - 1][j].value === "mina") {
            contador++;
          }
        }

        //Si no es la ultima fila
        if (i < 17) {
          //Y no la primera columna
          if (j > 0) {
            if (minaArray[i + 1][j - 1].value === "mina") {
              contador++;
            }
          }
          //Y no es la ultima columna
          if (j < 17) {
            if (minaArray[i + 1][j + 1].value === "mina") {
              contador++;
            }
          }
          if (minaArray[i + 1][j].value === "mina") {
            contador++;
          }
        }

        //Si no es la primera columna
        if (j > 0) {
          if (minaArray[i][j - 1].value === "mina") {
            contador++;
          }
        }
        //Si no es la ultima columna
        if (j < 17) {
          if (minaArray[i][j + 1].value === "mina") {
            contador++;
          }
        }

        minaArray[i][j].value = contador;
      }
      contador = 0;
    }
  }
};

document.addEventListener(
  "DOMContentLoaded",
  cargaBotones(),
  asignaMinas(),
  asignaNumeros()
);
