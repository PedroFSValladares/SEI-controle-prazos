createPopUp();
//setTimeout(() => {
    //const tableGerados = document.querySelectorAll("#tblProcessosGerados tbody td");
    //const tableRecebidos = document.querySelectorAll("#tblProcessosRecebidos tbody td");
    const PROCESSO_GERADOS = getProcessos("Gerados");
    const PROCESSOS_RECEBIDOS = getProcessos("Recebidos");
    const SERVIDOR_LOGADO = getServidor();

    verificaPrazos(PROCESSO_GERADOS, SERVIDOR_LOGADO);
    verificaPrazos(PROCESSOS_RECEBIDOS, SERVIDOR_LOGADO);

//}, 5000)

function getProcessos(type){
    let tableProcessosGerados = document.querySelectorAll(`#tblProcessos${type} tr`);
    return Array.from(tableProcessosGerados).filter((processo, index) => {
        return index >= 2;
    });
}
function getServidor(){
    const servidorLogadoInput = document.getElementById("hdnInfraPrefixoCookie");
    return servidorLogadoInput.value.substring(servidorLogadoInput.value.lastIndexOf("_") + 1);
}
function verificaPrazos(processos, servidor){
    let pr = [];
    let numeroProcessos = "";
    processos.forEach((processo) => {
        let serv = processo.children[3].textContent.replace("(", "").replace(")", "");
        if(processo.children[4].textContent !== "" && (serv === servidor || serv.textContent === "")){
            pr.push(processo.children[2]);
            numeroProcessos = numeroProcessos.concat(processo.children[2].textContent + "\n");
        }
        //console.log(processo);
    });
    if(pr.length != 0){
       showPopup(pr);
    }
}
function createPopUp(){
    let txtAviso;
    
    const body = document.body;
    const p = document.createElement("p");
    const backgroundDiv = document.createElement("backgroundDiv");
    const backgroundCSS = "position:absolute;visibility: hidden; display:inline-block; cursor: pointer; margin: auto; width: 100%; height: 100%;" +
    "padding: 10px; top: 0; bot:0; left;0; right:0;"
    const pCSS = "z-index: 1;"
    const backgroundDivStyle = backgroundDiv.style;
    const pStyle = p.style

    backgroundDiv.classList.add("popup");
    p.classList.add("popup-text");
    
    p.textContent = "Os seguintes processos estão perto do prazo final:";

    backgroundDiv.appendChild(p);
    //backgroundDivStyle.position = "relative";
    //backgroundDivStyle.display = "inline-block";
    //backgroundDivStyle.cursor = "pointer";
    p.setAttribute("style", pCSS);
    backgroundDiv.setAttribute("style", backgroundCSS);
    body.append(backgroundDiv);
}
function showPopup(processos){
    let backgroundDiv = document.querySelector(".popup");

    //let span = document.querySelector(".popup-text");
    //let processos = verificaPrazos();
    //span.textContent = span.textContent.concat();
    console.log(processos);
    processos.forEach((element) => {
        var link = document.createElement("a");
        link.href = element.children[0].href;
        link.textContent = element.children[0].textContent;
        link.style = element.children[0].style;
        backgroundDiv.appendChild(link);
    })
    backgroundDiv.style.visibility = "visible";
}