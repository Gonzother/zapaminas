//Inicializacion del array del juego
let minaArray = new Array(18);
for (let i = 0; i < minaArray.length; i++) {
  minaArray[i] = new Array(18);
}

//Numero de minas
let nMinas = 2;
/* let nMinas = Math.floor(Math.random() * (60 - 30) + 30); */

//Elementos
const contador = document.getElementById("contador");
contador.textContent = nMinas;
let count = nMinas;

const total = document.getElementById("total");
total.textContent = nMinas;

const section = document.getElementById("section");

const abandonar = document.getElementById("abandonar");

//Funcion para colocar banderas y actualizar el contador
const colocaBandera = (event) => {
  if (event.target.classList.contains("bandera")) {
    count++;
  } else {
    count--;
  }

  event.target.classList.toggle("bandera");
  contador.textContent = count;

  if (count == 0) {
    finJuego(event);
  }
};

//Comprobacion de minas
const compruebaMinas = () => {
  let minaArray = section.children;

  for (const mina of minaArray) {
    if (mina.value == "mina" && !mina.classList.contains("bandera")) {
      return false;
    }
  }
  return true;
};

//Funcion fin del juego
const finJuego = (event) => {
  section.removeEventListener("mousedown", clickHandle);

  if (compruebaMinas()) {
    console.log("has ganado");
  } else {
    console.log("has muerto");
  }
};

//Funcion para revelar el contenido de una celda
const revelaNumero = (event) => {
  if (event.target.value === "mina") {
    event.target.classList.add("rojo");
    finJuego(event);
  } else {
    event.target.style.backgroundImage =
      "url(../assets/images/numbers/" + event.target.value + ".png)";
  }
  event.target.disabled = true;
};

//Funcion comprobadora del click
const clickHandle = (event) => {
  {
    if (event.target.nodeName === "BUTTON" && event.target.disabled == false) {
      switch (event.button) {
        case 0:
          revelaNumero(event);
          break;
        case 2:
          colocaBandera(event);
          break;
      }
    }
  }
};

//Listener que maneja el click sobre los botones
section.addEventListener("mousedown", clickHandle);

//Abandonar juego e iniciar uno nuevo
const nuevoJuego = () => {
  document.location.reload();
};
abandonar.addEventListener("click", nuevoJuego);

//Carga botones
const cargaBotones = () => {
  let fragment = document.createDocumentFragment();

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
          if (j < minaArray[i].length - 1) {
            if (minaArray[i - 1][j + 1].value === "mina") {
              contador++;
            }
          }
          if (minaArray[i - 1][j].value === "mina") {
            contador++;
          }
        }

        //Si no es la ultima fila
        if (i < minaArray.length - 1) {
          //Y no es la primera columna
          if (j > 0) {
            if (minaArray[i + 1][j - 1].value === "mina") {
              contador++;
            }
          }
          //Y no es la ultima columna
          if (j < minaArray[i].length - 1) {
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
        if (j < minaArray[i].length - 1) {
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

//DOMContentLoaded
document.addEventListener(
  "DOMContentLoaded",
  cargaBotones(),
  asignaMinas(),
  asignaNumeros()
);
