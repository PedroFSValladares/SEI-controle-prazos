//window.addEventListener("loaded", init());

if(document.title === "SEI - Controle de Processos"){
    setTimeout(() => {
    }, 500)
}
setTimeout(() => {
    const TABLE_GERADOS = document.querySelectorAll("#tblProcessosGerados");
    const PROCESSOS_GERADOS = getProcessos("Gerados");
    const PROCESSOS_RECEBIDOS = getProcessos("Recebidos");
    const SERVIDOR_LOGADO = getServidor();

    creteTable(TABLE_GERADOS);
    
    //verificaPrazos(PROCESSOS_GERADOS, SERVIDOR_LOGADO);
    verificaPrazos(SERVIDOR_LOGADO);
    //verificaPrazos(PROCESSOS_RECEBIDOS, SERVIDOR_LOGADO); 
},200)
function getProcessos(type){
    let tableProcessos = document.querySelectorAll(`#tblProcessos${type} tr`);
    return Array.from(tableProcessos).filter((processo, index) => {
        return index >= 1;
    });
}
function getServidor(){
    const servidorLogadoInput = document.getElementById("hdnInfraPrefixoCookie");
    return servidorLogadoInput.value.substring(servidorLogadoInput.value.lastIndexOf("_") + 1);
}
function verificaPrazos(servidor){
    let processos = document.querySelectorAll("#divGeradosAreaTabela tbody tr")
    let table = document.getElementById("tblProcessosComPrazos");
    processos.forEach((element) => {
        if(element.hasAttribute("id")){
            anotacaoImg = element.querySelector("img[src='imagens/sei_anotacao_pequeno.gif']");
            if(anotacaoImg != null){
                let prazo = document. createElement("td");
                prazo.align = "center";
                let anotacao = anotacaoImg.parentNode;
                prazo.textContent = getData(anotacao);
                if(getData(anotacao) > 0 && getData(anotacao) !== ""){
                    element.appendChild(prazo);
                    table.appendChild(anotacao.parentNode.parentNode);
                    chrome.runtime.sendMessage({"processo": "adicionado"}).then(success, error);    
                }
            }
        }
    })
}

function creteTable(TABLE_GERADOS){
    const table = document.createElement("table")
    const form = document.getElementById("frmProcedimentoControlar");
    const check = document.createElement("a");
    const imageCheck = document.createElement("img")
    const tableHead = document.createElement("thead");
    const headCells = [];

    for(var i = 0; i < 5; i++){
        headCells.push(document.createElement("th"));
        headCells[i].classList.add("tituloControle");
        headCells[i].style.width = "5%"
        tableHead.appendChild(headCells[i]);
    }
    imageCheck.src = "/infra_css/imagens/check.gif";
    check.appendChild(imageCheck);
    headCells[0].appendChild(check);
    headCells[2].textContent = "Sujeitos a Prazo";
    headCells[4].textContent = "Prazo";
    table.id = "tblProcessosComPrazos";
    table.appendChild(tableHead);

for(let i = 0; i < TABLE_GERADOS[0].attributes.length; i++){
    let atributoRenomeado = TABLE_GERADOS[0].attributes[i].value.replace("Gerados", "ComPrazos")
    //table.setAttribute(TABLE_GERADOS[0].attributes[i].name, atributoRenomeado);
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
    /*
    let mouseOverText = "";
    let data = "";
    let aux;
    let prazo;
    
    if(processo.children[1].children.length > 0){
        mouseOverText = processo.children[1].children[0].getAttribute("onmouseover");
    }

    console.log(processo.children[1].children.length)
    if(mouseOverText.toLowerCase().lastIndexOf("prazo") != -1 || mouseOverText != "undefined") {
        let aux = mouseOverText.substring(mouseOverText.lastIndexOf("Prazo"));
        aux = aux.replace("'", "").replace("Prazo:", "").trim().split(",")[0].split("/").map((element)=>{
            if(!isNaN(element))
            return element;
        });
        console.log(aux)
        data = new Date(aux[2], aux[1], aux[0]);
    }
    if(data != "Invalid Date"){
        let now = new Date()
        console.log(now)
        prazo = Math.round(Math.abs(data - now) / (1000 * 3600 * 24));
    }
    if(mouseOverText != "undefined"){
        aux = mouseOverText.split("\\n")
        console.log(aux);
    }
    */

    let mouseOverText = processo.getAttribute("onmouseover")
    console.log(mouseOverText)
    let prazo;
    if(mouseOverText.toLowerCase().lastIndexOf("prazo") != -1 || mouseOverText != "undefined") {
        let aux = mouseOverText.substring(mouseOverText.lastIndexOf("Prazo"));
        aux = aux.replace("'", "").replace("Prazo:", "").trim().split(",")[0].split("/").map((element)=>{
            if(!isNaN(element))
            return element;
        });
        let now = new Date()
        data = new Date(aux[2], aux[1], aux[0], now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        console.log(data)
        if(data != "Invalid Date"){
            prazo = Math.abs(data - now) / (1000 * 3600 * 24);
        }
    }
    return (prazo == "undefined") ? "" : prazo;
}

function success(e){
    console.log("Mensagem enviada");
}

function error(){
    console.log("houve um erro, mensagem não enviada");
}