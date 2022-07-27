/*
//createPopUp();
//setTimeout(() => {
    //const TABLE_GERADOS = document.querySelectorAll("#tblProcessosGerados tbody td");
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
if(document.title === "SEI - Controle de Processos"){
    setTimeout(() => {
        const TABLE_GERADOS = document.querySelectorAll("#tblProcessosGerados");
        const PROCESSO_GERADOS = getProcessos("Gerados");
        const PROCESSOS_RECEBIDOS = getProcessos("Recebidos");
        const SERVIDOR_LOGADO = getServidor();
        
        creteTable(TABLE_GERADOS);
        
        verificaPrazos(PROCESSO_GERADOS, SERVIDOR_LOGADO);
        verificaPrazos(PROCESSOS_RECEBIDOS, SERVIDOR_LOGADO);
        
    }, 2000)
}

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
    let table = document.getElementById("tblProcessosComPrazos");
    let pr = [];
    processos.forEach((processo) => {
        let serv = processo.children[3].textContent.replace("(", "").replace(")", "");
        if(processo.children[4].textContent != "" && (serv === servidor || serv.textContent === "")){
            table.appendChild(processo);
            pr.push(processo);
        }
    });
    if(pr.length != 0){
        sendMessage({"processos": pr});    
    }
}

function creteTable(TABLE_GERADOS){
   const table = document.createElement("table")
    const form = document.getElementById("frmProcedimentoControlar");
    const check = document.querySelector(".table #lnkInfraCheck");
    const headRow = document.querySelector("#tblProcessosGerados thead").cloneNode(true);
    headRow.children[0].children[2].children[0].textContent = "Sujeitos a Prazo"
    console.log(headRow.children[0].children[0].children[0].children[1].setAttribute("onClick", "teste()"));
    /*
    const head = document.createElement("thead");
    const body = document.createElement("tbody");
    const tableTitle = document.createElement("th");
    const tableDate = document.createElement("th");
    
    tableTitle.textContent = "Sujeito a prazo";
    headRow.appendChild(tableTitle);
    headRow.appendChild(tableDate);
    */
    table.appendChild(headRow);
    
   for(let i = 0; i < TABLE_GERADOS[0].attributes.length; i++){
    let atributoRenomeado = TABLE_GERADOS[0].attributes[i].value.replace("Gerados", "ComPrazos")
       table.setAttribute(TABLE_GERADOS[0].attributes[i].name, atributoRenomeado);
   }
   //table.setAttribute("id", "tblProcessosComPrazos");
   const container = document.createElement("div");
   const divTabela = document.createElement("div");
   divTabela.classList.add("divPrazosAreaTabela");
   /*
   TABLE_GERADOS[0].classList.forEach((element) => {
       table.classList.add(element);
   })
   */
   container.classList.add("divPrazos")
   //table.appendChild(headRow);
   table.classList.add("table");
   divTabela.classList.add("infraAreaTabela");
   divTabela.appendChild(table);
   container.appendChild(divTabela);
   form.insertBefore(container, form.childNodes[8]);
   divTabela.setAttribute("id", "teste");
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