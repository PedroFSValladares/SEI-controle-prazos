//window.addEventListener("loaded", init());
if(document.title === "SEI - Controle de Processos"){
    setTimeout(() => {
    }, 500)
}
setTimeout(() => {
    const TABLE_GERADOS = document.querySelectorAll("#tblProcessosGerados");
    const PROCESSOS_GERADOS = getProcessos("Gerados");
    const PROCESSOS_RECEBIDOS = getProcessos("Recebidos");
    
    creteTable(TABLE_GERADOS);
    
    //verificaPrazos(PROCESSOS_GERADOS, SERVIDOR_LOGADO);
    verificaPrazos();
    //verificaPrazos(PROCESSOS_RECEBIDOS, SERVIDOR_LOGADO); 
},200)
function getProcessos(type){
    let tableProcessos = document.querySelectorAll(`#tblProcessos${type} tr`);
    return Array.from(tableProcessos).filter((processo, index) => {
        return index >= 1;
    });
}

function verificaPrazos(){
    let processos = document.querySelectorAll("#divGeradosAreaTabela tbody tr")
    let table = document.getElementById("tblProcessosComPrazos");
    processos.forEach((element,index) => {
        if(element.hasAttribute("id")){
            anotacaoImg = element.querySelector("img[src='imagens/sei_anotacao_pequeno.gif']");
            if(anotacaoImg != null){
                let prazoTd = document.createElement("td");
                let anotacao = anotacaoImg.parentNode;
                let prazo = getData(anotacao);
                prazoTd.align = "center";
                prazoTd.textContent = prazo;
                if(prazo > 0 && prazo !== ""){
                    let newElement = copyProcess(element, index);
                    newElement.appendChild(prazoTd);
                    table.appendChild(newElement);
                    //chrome.runtime.sendMessage({"processo": "adicionado"}).then(success, error);    
                }
            }
        }
    })
}

function copyProcess(processo, i){
    let pr = document.createElement("tr");
    let processCells = Array.from(processo.children);
    console.log(processCells)
    processCells.forEach((element) => {
        pr.appendChild(element.cloneNode(true));
    })
    pr.children[0].querySelector("input").id = "chkComPrazoItem" + i;
    pr.classList.add("infraTrClara")
    return pr;
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

    check.addEventListener("click", (e) => {
        let processos = Array.from(document.querySelectorAll("#tblProcessosComPrazos tr"));
        processos.forEach((element) => {
            let checkStatus = element.querySelector("input")
            element.classList.toggle("infraTrMarcada");
            checkStatus.checked = !(checkStatus.checked);
        });
    })

    imageCheck.src = "/infra_css/imagens/check.gif";
    check.appendChild(imageCheck);
    headCells[0].appendChild(check);
    headCells[2].textContent = "Sujeitos a Prazo";
    headCells[4].textContent = "Prazo";
    table.id = "tblProcessosComPrazos";
    table.appendChild(tableHead);

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
    let mouseOverText = processo.getAttribute("onmouseover")
    let mouseOverTextFormated = mouseOverText.toLowerCase()
    console.log(mouseOverTextFormated.lastIndexOf("prazo"))
    let prazo;
    if(mouseOverTextFormated.lastIndexOf("prazo") != -1 && mouseOverText != "undefined") {
        let aux = mouseOverTextFormated.substring(mouseOverTextFormated.lastIndexOf("prazo"));
        aux = aux.replace("/['-\\/_\",.]/", "").replace("prazo:", "").trim().split(",")[0].split("/").map((element)=>{
            if(!isNaN(element))
            return element;
        });
        console.log(aux)
        let now = new Date()
        if(aux.length == 2 || aux[2].length == 2){
            data = new Date(now.getFullYear(), aux[1], aux[0], now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        }else{
            data = new Date(aux[2], aux[1], aux[0], now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        }
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