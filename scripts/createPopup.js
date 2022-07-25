function createPopUp(){
    let txtAviso;
    
    const body = document.body;
    const divTexto = document.createElement("div");
    const backgroundDiv = document.createElement("div");
    const centralDiv = document.createElement("div");
    const closeButton = document.createElement("button");

    centralDiv.appendChild(closeButton);

    closeButton.addEventListener("click", (e) => {
        backgroundDiv.style.visibility = "hidden";
    })

    const pCSS = "z-index: 1;"
    const backgroundDivStyle = backgroundDiv.style;

    backgroundDiv.classList.add("background-popup");
    centralDiv.classList.add("popup");
    divTexto.classList.add("popup-text");
    
    divTexto.textContent = "Os seguintes processos estão perto do prazo final:";

    centralDiv.appendChild(divTexto);
    backgroundDiv.appendChild(centralDiv);

    body.append(backgroundDiv);
}
createPopUp();