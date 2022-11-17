// Verifica se os processos possuem prazos atribuídos a eles.
function verificaPrazos(tipoProcesso){
    var processos = Array.from($(`#div${tipoProcesso}AreaTabela tbody tr`))
    var table = $("tblProcessosPrazos");
    var contemPrazos = false;
    var anotacaoImg;
    processos.forEach((element,index) => {
        if(element.hasAttribute("id")){
            anotacaoImg = element.querySelector("img[src='imagens/sei_anotacao_pequeno.gif']");
            if(anotacaoImg == null){
                anotacaoImg = element.querySelector("img[src='imagens/sei_anotacao_prioridade_pequeno.gif']");
            }
            if(anotacaoImg != null){
                var prazoTd = document.createElement("td");
                var anotacao = anotacaoImg.parentNode;
                var prazo = getData(anotacao);
                prazoTd.textContent = prazo;
                if(prazo != undefined){
                    var newElement = copyProcess(element, index);
                    newElement.appendChild(prazoTd);
                    $("#tblProcessosPrazos").append(newElement);
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
    pr.classList.add("ComPrazo")
    return pr;
}

// Extrai a data da anotação do processo
function getData(processo){
    var mouseOverText = processo.getAttribute("onmouseover")
    var mouseOverTextFormated = mouseOverText.toLowerCase()
    var prazo;
    var dataArray = [];
    var textLines = mouseOverTextFormated.split("\\n");
    textLines.forEach((element) => {
        if(element.lastIndexOf("prazo") != -1 && mouseOverText != "undefined") {
            var aux = element.substring(element.lastIndexOf("prazo"));
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
    })

    return prazo;
}

if(!verificaPrazos("Gerados") & !verificaPrazos("Recebidos")){
    var table = $("#tblProcessosPrazos");
    var infoRow = document.createElement("tr");
    var info = document.createElement("td");
    var tutorialURL = chrome.runtime.getURL("./tutorial/index.html")
    info.innerHTML = `Nada para mostrar aqui, clique <a href='${tutorialURL}' target='_blank'>aqui</a> para saber como adicionar prazo a um processo.`;
    info.colSpan = "5";
    infoRow.appendChild(info);
    infoRow.id = "info";
    $("#tblProcessosPrazos").append(infoRow);
}