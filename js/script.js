let minaArray = new Array(18);
for (let i = 0; i < minaArray.length; i++) {
  minaArray[i] = new Array(18);
}

const section = document.getElementById("section")

const cargaInicial = () => {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < minaArray.length; i++) {
    for (let j = 0; j < minaArray[i].length; j++) {
      minaArray[i][j] = j;
      let newButton = document.createElement("BUTTON");
      newButton.classList.add("button");
      fragment.append(newButton);
    }
  }
  section.append(fragment)
};
document.addEventListener("DOMContentLoaded", cargaInicial);

console.log(minaArray);
