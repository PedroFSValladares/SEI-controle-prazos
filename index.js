if(document.title === "SEI - Controle de Processos"){
    init();
}
function init(){
    let table = creteTable();
    if(!verificaPrazos("Gerados") && !verificaPrazos("Recebidos")){
        let infoRow = document.createElement("tr");
        let info = document.createElement("td");
        info.innerHTML = "Nada para mostrar aqui, clique <a href='https://pedrofsvalladares.github.io/' target='_blank'>aqui</a> para saber como adicionar prazo a um processo.";
        info.colSpan = "5";
        infoRow.appendChild(info);
        infoRow.id = "info";
        table.appendChild(infoRow);
    }
}

function verificaPrazos(tipoProcesso){
    let processos = document.querySelectorAll(`#div${tipoProcesso}AreaTabela tbody tr`)
    let table = document.getElementById("tblProcessosComPrazos");
    let contemPrazos = false;
    processos.forEach((element,index) => {
        let anotacaoImg;
        if(element.hasAttribute("id")){
            anotacaoImg = element.querySelector("img[src='imagens/sei_anotacao_pequeno.gif']");
            if(anotacaoImg != null){
                let prazoTd = document.createElement("td");
                let anotacao = anotacaoImg.parentNode;
                let prazo = getData(anotacao);
                prazoTd.textContent = prazo;
                if(prazo != undefined){
                    let newElement = copyProcess(element, index);
                    newElement.appendChild(prazoTd);
                    table.appendChild(newElement);
                    contemPrazos = true;
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
    return contemPrazos
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
    let table = document.createElement("table")
    let form = document.getElementById("frmProcedimentoControlar");
    let check = document.createElement("a");
    let imageCheck = document.createElement("img")
    let tableHead = document.createElement("thead");
    let container = document.createElement("div");
    let divTabela = document.createElement("div");

    for(var i = 0; i < 5; i++){
        let th = document.createElement("th");
        th.classList.add("tituloControle");
        tableHead.appendChild(th);
    }
    
    check.addEventListener("click", (e) => {
        let processos = Array.from(document.querySelectorAll("#tblProcessosComPrazos tr"));
        processos.forEach((element) => {
            let checkStatus = element.querySelector("input")
            if (checkStatus != null){
                checkStatus.click();
            }
        });
        
    })
    
    imageCheck.src = "/infra_css/imagens/check.gif";
    check.appendChild(imageCheck);
    tableHead.children[0].appendChild(check);
    tableHead.children[1].style.width = "30px";
    tableHead.children[2].textContent = "Sujeitos a Prazo";
    tableHead.children[2].style.width = "100px"
    tableHead.children[4].textContent = "Prazo";
    tableHead.children[4]. style.width = "50px";
    table.id = "tblProcessosComPrazos";
    table.appendChild(tableHead);

    divTabela.classList.add("divPrazosAreaTabela");
    divTabela.classList.add("infraAreaTabela");

    container.classList.add("divPrazos")
    table.classList.add("table");
    divTabela.appendChild(table);
    container.appendChild(divTabela);
    form.insertBefore(container, form.children[4]);
    return table;
}

function getData(processo){
    let mouseOverText = processo.getAttribute("onmouseover")
    let mouseOverTextFormated = mouseOverText.toLowerCase()
    let prazo;
    let dataArray = [];
    if(mouseOverTextFormated.lastIndexOf("prazo") != -1 && mouseOverText != "undefined") {
        let aux = mouseOverTextFormated.substring(mouseOverTextFormated.lastIndexOf("prazo"));
        if(aux.lastIndexOf("/") != -1){
            aux = aux.split("/");
        }else{
            aux.split("\\");
        }
        
        aux.forEach((element) => {
            dataArray.push(element.replace(/[\D]/gi, ""))
        })
        let now = new Date()
        if(dataArray.length == 2 || dataArray[2].length <= 2){
            data = new Date(now.getFullYear(), dataArray[1]-1, dataArray[0], now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        }else{
            data = new Date(dataArray[2], dataArray[1]-1, dataArray[0], now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
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