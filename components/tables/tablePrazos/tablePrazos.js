class TablePrazos extends Table{
    constructor(id, title, qntdHeaders){
        super(id, title, qntdHeaders)
        this.build()
        this.verificarPrazos()
    }

    build(){
        var tableHead = this.root.querySelectorAll("thead")[0]
        tableHead.children[4].textContent = "Prazo";
    }

    verificarPrazos(){
        var processos = Array.from(document.querySelectorAll('[onmouseover*="prazo" i]'))
        processos = processos.filter(element => element.getAttribute("href").indexOf("andamento_marcador_gerenciar") == -1)
        processos.forEach((element, index) => {
            var processRoot = element.parentNode.parentNode
            var processoCopia = this.copyProcess(processRoot, index)
            processoCopia.lastChild.innerText = this.getProcessDate(element)
            this.root.firstChild.appendChild(processoCopia)
        })
    }

    copyProcess(processo, i){
        var pr = document.createElement("tr");
        var processCells = Array.from(processo.children);
        var prazoCell = document.createElement("td")

        for(var i = 0; i < 4; i++){
            pr.appendChild(processCells[i].cloneNode(true));
        }
        prazoCell.innerText = 
        pr.appendChild(prazoCell)
        pr.children[0].querySelector("input").id = "chkComPrazoItem" + i;
        pr.classList.add("infraTrClara")
        pr.classList.add("ComPrazo")
        return pr;
    }

    getProcessDate(processo){
        var mouseOverText = processo.getAttribute("onmouseover")
        var mouseOverTextFormated = mouseOverText.toLowerCase()
        var prazo;
        var data
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
                if(Array.isArray(aux)){
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
            } 
        })
        return prazo;
    }
}