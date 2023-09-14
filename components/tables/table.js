class Table {
    root

    constructor(id, title, qntdHeaders){
        this.root = this.criarTabela(id, title, qntdHeaders)
    }

    criarTabela(id, title, headers){
        var table = document.createElement("table")
        var form = document.getElementById("frmProcedimentoControlar");
        var tableHead = document.createElement("thead");
        var divTabela = document.createElement("div");
        var check = document.createElement("a");
        var imageCheck = document.createElement("img")
    
        for(var i = 0; i < headers; i++){
            var th = document.createElement("th");
            th.classList.add("tituloControle");
            tableHead.appendChild(th);
        }
        
        check.addEventListener("click", (e) => {
            var processos = Array.from(document.querySelectorAll(`#tblProcessos${id} tr`));
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
        tableHead.children[1].style.width = "50px";
        tableHead.children[2].textContent = title;
        tableHead.children[2].style.width = "100px"
    
    
        table.id = "tblProcessos" + id;
        table.appendChild(tableHead);
    
        divTabela.classList.add(`div${id}AreaTabela`);
        divTabela.classList.add("infraAreaTabela");
    
        table.classList.add("table");
        divTabela.appendChild(table);
    
        return divTabela;
    }
}