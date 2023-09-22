class JanelaConfiguracao{
    root
    constructor(){
        this.root = this.build()
        this.carregarMarcadores()
    }

    build(){
        var janela = document.createElement("div")
        var select = document.createElement("select");
        var refreshButton = document.createElement("a")
        var refreshIcon = document.createElement("img")
        var closeButton = document.createElement("a")
        var closeIcon = document.createElement("img")
        
        refreshIcon.setAttribute("src", extension.getIconUrl("./images/icons/refresh.png"))
        refreshButton.appendChild(refreshIcon)
    
        closeIcon.setAttribute("src", extension.getIconUrl("./images/icons/close.png"))
        closeButton.addEventListener("click", (event) => {
            $(janela).hide()
        })
        closeButton.appendChild(closeIcon)
        
        select.classList.add("opcoes")
        janela.appendChild(closeButton)
        janela.appendChild(select)
        janela.appendChild(refreshButton)
        janela.classList.add("janelaOpcoes")
        $(janela).hide()
        
        refreshButton.addEventListener("click", (event) => {
            event.preventDefault();
            config.marcadores = []
            select.innerHTML = ""
            
            var marcadoresRaw = http.request(htmlExtractor.extractMarcadorUrl(), "GET")
            config.marcadores = htmlExtractor.extrairMarcadores(marcadoresRaw)
            config.update()
            
           this.carregarMarcadores()
        })
    
        $(select).on("change", (e) => {
            var newMarcador = config.marcadores.filter((element) => element.titulo == select.value)[0]
            config.marcadorSelecionado = (newMarcador == null || newMarcador == undefined) ? {} : newMarcador 
            config.update();
            document.location.reload()
        })
        
        return janela
    }
    
    carregarMarcadores(){
        var select = this.root.querySelector("select")
        select.appendChild(document.createElement("option"))
        config.marcadores.forEach((marcador) => {
            var option = document.createElement("option")
            var text = marcador.titulo
            
            option.innerText = text 
            select.appendChild(option)
        })

        if(config.marcadorSelecionado !== undefined && config.marcadorSelecionado !== null){
            select.value = config.marcadorSelecionado.titulo
        }
    }
}