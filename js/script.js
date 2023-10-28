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

//Carga incial
const cargaInicial = () => {
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

  //Asignacion minas
  for (let i = 0; i < nMinas; i++) {
    let x, y;

    do {
      x = Math.floor(Math.random() * 18);
      y = Math.floor(Math.random() * 18);
    } while (minaArray[x][y].value === "mina");

    minaArray[x][y].value = "mina";
    minaArray[x][y].classList.add("rojo");
  }

  //Asignacion numeros
  for (let i = 0; i < minaArray.length; i++) {
    
    
  }
};
document.addEventListener("DOMContentLoaded", cargaInicial);
