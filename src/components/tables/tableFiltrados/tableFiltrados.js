class TableFiltrados extends Table{
    constructor(id, title, qntdHeaders){
        super(id, title, qntdHeaders)
        this.build()
        if(Object.keys(config.marcadorSelecionado).length != 0){
            this.filtrarProcessos()
        }
    }

    build(){
        var tableHead = this.root.querySelectorAll("thead")[0]
        var buttonConfig = document.createElement("a")
        var configIcon = document.createElement("img")
        var caption = document.createElement("caption")
        
        caption.classList.add("infraCaption")
        this.root.firstChild.insertBefore(caption, this.root.querySelector("thead"))
        
        buttonConfig.appendChild(configIcon)
        configIcon.src = Extension.getIconUrl("./images/icons/config.png")
        
        tableHead.children[3].appendChild(buttonConfig)
        buttonConfig.addEventListener("click", (event) => {
            $(".janelaOpcoes").toggle()
        })
    } 
    
    filtrarProcessos(){
        var anchors = Array.from(document.querySelectorAll(`[onmouseover*="'${config.marcadorSelecionado.titulo}'"`))
        var processos = anchors.map(element => element.parentElement.parentElement)
        processos = processos.filter(element => !element.classList.contains("ComPrazo"))
        processos.forEach(element => {
            this.root.firstChild.appendChild(element)
        })
        this.attRegistros(processos.length)
    }

    attRegistros(qtdt){
        var caption = document.querySelector("#tblProcessosRecebidos .infraCaption")
        var captionsText = caption.innerText 
        var newText = captionsText.replace(/[:]/gi, "").split(" ")
        var valores = newText.filter(element => $.isNumeric(element))
        
        this.root.querySelector(".infraCaption").innerText = `${qtdt} registros:`
           
        caption.innerText = `${valores[0] - qtdt} registros ${(valores[0] == undefined || valores[1] == undefined) ? "" : `- ${valores[1]} a ${valores[2] == valores[0] ? valores[0] - qtdt : valores[2]}:`}`
    }
}