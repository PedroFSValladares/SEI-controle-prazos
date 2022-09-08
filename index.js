if(document.title === "SEI - Controle de Processos" && document.URL.indexOf("ver_por_marcadores=1") === -1){
    init();
}
// Ponto de início da extensão
// Adciona o texto padrão caso não haja processos com prazo.
function init(){
    var table = creteTable();
    if(!verificaPrazos("Gerados") && !verificaPrazos("Recebidos")){
        var infoRow = document.createElement("tr");
        var info = document.createElement("td");
        var tutorialURL = chrome.runtime.getURL("./tutorial/index.html")
        info.innerHTML = `Nada para mostrar aqui, clique <a href='${tutorialURL}' target='_blank'>aqui</a> para saber como adicionar prazo a um processo.`;
        info.colSpan = "5";
        infoRow.appendChild(info);
        infoRow.id = "info";
        table.appendChild(infoRow);
    }
}

// Verifica se os processos possuem prazos atribuídos a eles.
function verificaPrazos(tipoProcesso){
    var processos = document.querySelectorAll(`#div${tipoProcesso}AreaTabela tbody tr`)
    var table = document.getElementById("tblProcessosComPrazos");
    var contemPrazos = false;
    processos.forEach((element,index) => {
        var anotacaoImg;
        if(element.hasAttribute("id")){
            anotacaoImg = element.querySelector("img[src='imagens/sei_anotacao_pequeno.gif']");
            if(anotacaoImg != null){
                var prazoTd = document.createElement("td");
                var anotacao = anotacaoImg.parentNode;
                var prazo = getData(anotacao);
                prazoTd.textContent = prazo;
                if(prazo != undefined){
                    var newElement = copyProcess(element, index);
                    newElement.appendChild(prazoTd);
                    table.appendChild(newElement);
                    contemPrazos = true;
                    if(prazo <= 2 || isNaN(prazo)){
                        var avisoAnchor = document.createElement("a");
                        var aviso = document.createElement("img");
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

// Copia os processos com prazo
function copyProcess(processo, i){
    var pr = document.createElement("tr");
    var processCells = Array.from(processo.children);
    for(var i = 0; i < 4; i++){
        pr.appendChild(processCells[i].cloneNode(true));
    }
    pr.children[0].querySelector("input").id = "chkComPrazoItem" + i;
    pr.classList.add("infraTrClara")
    return pr;
}

// Cria a tabela de prazos
function creteTable(){
    var table = document.createElement("table")
    var form = document.getElementById("frmProcedimentoControlar");
    var check = document.createElement("a");
    var imageCheck = document.createElement("img")
    var tableHead = document.createElement("thead");
    var container = document.createElement("div");
    var divTabela = document.createElement("div");

    for(var i = 0; i < 5; i++){
        var th = document.createElement("th");
        th.classList.add("tituloControle");
        tableHead.appendChild(th);
    }
    
    check.addEventListener("click", (e) => {
        var processos = Array.from(document.querySelectorAll("#tblProcessosComPrazos tr"));
        processos.forEach((element) => {
            var checkStatus = element.querySelector("input")
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

// Extrai a data da anotação do processo
function getData(processo){
    var mouseOverText = processo.getAttribute("onmouseover")
    var mouseOverTextFormated = mouseOverText.toLowerCase()
    var prazo;
    var dataArray = [];
    if(mouseOverTextFormated.lastIndexOf("prazo") != -1 && mouseOverText != "undefined") {
        var aux = mouseOverTextFormated.substring(mouseOverTextFormated.lastIndexOf("prazo"));
        if(aux.lastIndexOf("/") != -1){
            aux = aux.split("/");
        }else{
            aux.split("\\");
        }
        
        aux.forEach((element) => {
            dataArray.push(element.replace(/[\D]/gi, ""))
        })
        var now = new Date()
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