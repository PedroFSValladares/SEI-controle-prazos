class HtmlExtractor {
    // processa a resposta para extrair os marcadores
    extrairMarcadores(doc = ""){
        var linhas = doc.split("\n")
        var marcadoresContents = []
        var marcadoresTitles = []
        var marcadores = []
        var marcadoresSimbolos
    
        marcadoresContents = linhas.filter(
            element => element.indexOf("infraTrClara") != -1 
            || element.indexOf("infraTrEscura") != -1
            || element.indexOf("trVermelha") != -1
        )
    
        marcadoresSimbolos = marcadoresContents.map((element) => {
            return element.slice(element.indexOf("src"), element.indexOf(".png"))
        })
    
        marcadoresTitles = marcadoresContents.map((element) => {
            return element.slice(element.indexOf("title"), element.indexOf(" tabindex"))
        })
    
        marcadoresSimbolos.forEach((simbolo, index) => {
            marcadores.push(
                {
                    "titulo": this.extractTexts(marcadoresTitles[index]),
                    "simbolo": this.extractTexts(simbolo)
                }
            ) 
        })
    
        linhas.forEach((element) => {
            //marcadoresTitles.push(element.slice(element.indexOf("title"), element.indexOf(" tabindex")));
        })
        return marcadores
    }
    
    extractTexts(texto = ""){
        var result
        if(texto.indexOf("src") != -1){
            result = texto.replace(/src="/i, "") + ".png"
        }else{
            result = texto.replace(/title="/i, "")
        }
        return result.replace("\"", "")
    }

    extractMarcadorUrl(){
        var menuItem = Array.from($("#main-menu li a")).filter((element) => { return element.textContent == "Marcadores" }).pop();
        return menuItem.href
    }
}

var htmlExtractor = new HtmlExtractor()