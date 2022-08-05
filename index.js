if(document.title === "SEI - Controle de Processos"){
    init();
}
function init(){
    creteTable();
    verificaPrazos("Gerados");
    verificaPrazos("Recebidos");
}

function verificaPrazos(tipoProcesso){
    let processos = document.querySelectorAll(`#div${tipoProcesso}AreaTabela tbody tr`)
    let table = document.getElementById("tblProcessosComPrazos");
    processos.forEach((element,index) => {
        let anotacaoImg;
        if(element.hasAttribute("id")){
            anotacaoImg = element.querySelector("img[src='imagens/sei_anotacao_pequeno.gif']");
            if(anotacaoImg != null){
                let prazoTd = document.createElement("td");
                let anotacao = anotacaoImg.parentNode;
                let prazo = getData(anotacao);
                prazoTd.align = "center";
                prazoTd.textContent = prazo;
                if(prazo != undefined){
                    let newElement = copyProcess(element, index);
                    newElement.appendChild(prazoTd);
                    table.appendChild(newElement);
                    if(prazo <= 2 || isNaN(prazo)){
                        let avisoAnchor = document.createElement("a");
                        let aviso = document.createElement("img");
                        avisoAnchor.setAttribute("onmouseover", "return infraTooltipMostrar('Processo se aproximando do prazo!', 'Aviso');");
                        avisoAnchor.setAttribute("onmouseout", "return infraTooltipOcultar();");
                        aviso.src = "imagens/exclamacao.png";
                        avisoAnchor.appendChild(aviso);
                        newElement.children[1].appendChild(avisoAnchor);
                    }               
                }
            }
        }
    })
}

function copyProcess(processo, i){
    let pr = document.createElement("tr");
    let processCells = Array.from(processo.children);
    for(let i = 0; i < 4; i++){
        pr.appendChild(processCells[i].cloneNode(true));
    }
    pr.children[0].querySelector("input").id = "chkComPrazoItem" + i;
    pr.classList.add("infraTrClara")
    return pr;
}

function creteTable(){
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
    headCells[1].style.width = "30px";
    headCells[2].textContent = "Sujeitos a Prazo";
    headCells[2].style.width = "100px"
    headCells[4].textContent = "Prazo";
    headCells[4]. style.width = "50px";
    table.id = "tblProcessosComPrazos";
    table.appendChild(tableHead);

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
    let prazo;
    if(mouseOverTextFormated.lastIndexOf("prazo") != -1 && mouseOverText != "undefined") {
        let aux = mouseOverTextFormated.substring(mouseOverTextFormated.lastIndexOf("prazo"));
        aux = aux.replace(/[-_'"().;:]/gi, "").replace("prazo", "").trim().split(",")[0].split("/").map((element)=>{
            if(!isNaN(element))
            return element;
        });
        let now = new Date()
        if(aux.length == 2 || aux[2].length == 2){
            data = new Date(now.getFullYear(), aux[1]-1, aux[0], now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        }else{
            data = new Date(aux[2], aux[1]-1, aux[0], now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        }
        if(data != "Invalid Date"){
            if(data < now){
                prazo = "vencido";
            }else{
                prazo = Math.abs(data - now) / (1000 * 3600 * 24);
                if(prazo == 0){
                    prazo = "hoje";
                }
            }
        }
    }
    return prazo;
}