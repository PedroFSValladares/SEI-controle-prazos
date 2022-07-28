//window.addEventListener("loaded", init());

if(document.title === "SEI - Controle de Processos"){
    setTimeout(() => {
    }, 200)
}
setTimeout(() => {
    const TABLE_GERADOS = document.querySelectorAll("#tblProcessosGerados");
    const PROCESSO_GERADOS = getProcessos("Gerados");
    const PROCESSOS_RECEBIDOS = getProcessos("Recebidos");
    const SERVIDOR_LOGADO = getServidor();
    console.log("a");
    creteTable(TABLE_GERADOS);
    
    verificaPrazos(PROCESSO_GERADOS, SERVIDOR_LOGADO);
    verificaPrazos(PROCESSOS_RECEBIDOS, SERVIDOR_LOGADO); 
},200)
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
    var prazo;
    let data;
    processos.forEach((processo) => {
        let serv = processo.children[3].textContent.replace("(", "").replace(")", "");
        if(getData(processo) != "" && (serv === servidor || serv.textContent === "")){
            table.appendChild(processo);
            pr.push(processo);
        }
        /*
        if(processo.children[4].textContent != "" && (serv === servidor || serv.textContent === "")){
            table.appendChild(processo);
            pr.push(processo);
        }
        */
       
       if(prazo != -1){}
    });
    console.log(pr)
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
   table.appendChild(headRow);
   
   for(let i = 0; i < TABLE_GERADOS[0].attributes.length; i++){
       let atributoRenomeado = TABLE_GERADOS[0].attributes[i].value.replace("Gerados", "ComPrazos")
       table.setAttribute(TABLE_GERADOS[0].attributes[i].name, atributoRenomeado);
   }

   const container = document.createElement("div");
   const divTabela = document.createElement("div");
   divTabela.classList.add("divPrazosAreaTabela");

   container.classList.add("divPrazos")
   table.classList.add("table");
   divTabela.classList.add("infraAreaTabela");
   divTabela.appendChild(table);
   container.appendChild(divTabela);
   form.insertBefore(container, form.childNodes[8]);
   divTabela.setAttribute("id", "teste");
}

function getData(processo){
    let mouseOverText;
    let data = "";
    try{
    mouseOverText = processo.children[1].children[0].getAttribute("onmouseover");
    if(mouseOverText.lastIndexOf("Prazo") != -1) {
        let aux = mouseOverText.substring(mouseOverText.lastIndexOf("Prazo"));
        let dataString;
        aux = aux.replace("'", "").replace("Prazo:", "").trim().split(",")[0].split("/").map((element)=>{
            if(!isNaN(element))
            return element;
        });
        dataString = aux[0];
        data = new Date(aux[2], aux[1], aux[0]);
    }
} catch(erro){
    console.log(erro);
}
    return data;
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