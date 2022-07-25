/*
//createPopUp();
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

function showPopup(processos){
    const backgroundDiv = document.querySelector(".popup");
    const popupText = document.querySelector(".popup-text");
    
    console.log(processos);
    processos.forEach((element) => {
        var link = document.createElement("a");
        link.href = element.children[0].href;
        link.textContent = element.children[0].textContent;
        link.style = element.children[0].style;
        popupText.appendChild(link);
    })
    backgroundDiv.style.visibility = "visible";
    let title = chrome.i18n.getMessage("notificationTitle");
    //let content = chrome.i18n.getMessage("notificationContent", message.url);
    
}
*/
const table = document.createElement("table")
setTimeout(() => {
    const tableGerados = document.querySelectorAll("#tblProcessosGerados");
    const tela = document.getElementById("divInfraAreaTelaD");
    const PROCESSO_GERADOS = getProcessos("Gerados");
    const PROCESSOS_RECEBIDOS = getProcessos("Recebidos");
    const SERVIDOR_LOGADO = getServidor();
    tableGerados[0].classList.forEach((element) => {
        table.classList.add(element);
    })
    table.classList.add("table");
    tela.appendChild(table);
    
    verificaPrazos(PROCESSO_GERADOS, SERVIDOR_LOGADO);
    verificaPrazos(PROCESSOS_RECEBIDOS, SERVIDOR_LOGADO);
    
}, 2000)

function getProcessos(type){
    let tableProcessos = document.querySelectorAll(`#tblProcessos${type} tr`);
    return Array.from(tableProcessos).filter((processo, index) => {
        return index >= 2;
    });
}
function getServidor(){
    const servidorLogadoInput = document.getElementById("hdnInfraPrefixoCookie");
    return servidorLogadoInput.value.substring(servidorLogadoInput.value.lastIndexOf("_") + 1);
}
function verificaPrazos(processos, servidor){
    let pr = [];
    processos.forEach((processo) => {
        let serv = processo.children[3].textContent.replace("(", "").replace(")", "");
        if(processo.children[4].textContent <= 2 && (serv === servidor || serv.textContent === "")){
            table.appendChild(processo);
            pr.push(processo);
        }
    });
    if(pr.length != 0){
       sendMessage({"processos": pr});    
    }
}

function sendMessage(message){
    let promisse = chrome.runtime.sendMessage(message);
    promisse.then(success, error);
}

function success(e){
    console.log("Mensagem enviada");
}

function error(){
    console.log("houve um erro, mensagem não enviada");
}