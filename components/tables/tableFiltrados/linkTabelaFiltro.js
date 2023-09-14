class LinktabelaFiltro{
    root
    constructor(){
        this.root = this.build()
    }

    build(){
        var linkDiv = document.createElement("div")
        var link = document.createElement("a")
    
        $(link).text(config.menuHabilitado ? "Desabilitar filtro" : "Habilitar filtro") 
        $(link).addClass("ancoraPadraoPreta")
        $(linkDiv).attr("id", "divFiltrarProcessos") 
    
        $(linkDiv).append(link)
    
        $(link).click(() => {
            config.menuHabilitado = !config.menuHabilitado
            config.update()
            document.location.reload()
        })

        return linkDiv
    }
}