// obtem a URL para a lista de marcadores
function getMarcadoresURL(){
    var path;
    Array.from($("#main-menu li a")).forEach((element) => {
        if(element.textContent == "Marcadores")
            path = element.href
    });
    return path
}

// obtem a página com a lista de marcadores
function getMarcadores(url){
    var httpRequest
    var marcadores
    httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4){
            if(httpRequest.status === 200){
                marcadores = processarResposta(httpRequest.responseText)
            }else{
                console.log("falha na requisição.")
            }
        }
    }
    httpRequest.open("GET", url, false)
    httpRequest.send(null);
    return marcadores
}

// processa a resposta para extrair os marcadores
function processarResposta(doc = ""){
    var linhas = doc.split("\n")
    var marcadoresContents = []
    var marcadoresTitles = []
    var marcadores = []

    marcadoresContents = linhas.filter(element => element.indexOf("infraTrClara") != -1 || element.indexOf("infraTrEscura") != -1)

    marcadoresSimbolos = marcadoresContents.map((element) => {
        return element.slice(element.indexOf("src"), element.indexOf(".png"))
    })

    marcadoresTitles = marcadoresContents.map((element) => {
        return element.slice(element.indexOf("title"), element.indexOf(" tabindex"))
    })

    marcadoresSimbolos.forEach((simbolo, index) => {
        marcadores.push(
            {
                "titulo": extractTexts(marcadoresTitles[index]),
                "simbolo": extractTexts(simbolo)
            }
        ) 
    })

    console.log(marcadoresContents);
    console.log(marcadoresTitles);
    console.log(marcadoresSimbolos);
    console.log(marcadores)
    linhas.forEach((element) => {
        //marcadoresTitles.push(element.slice(element.indexOf("title"), element.indexOf(" tabindex")));
    })
    return marcadores
}

function extractTexts(texto = ""){
    var result
    if(texto.indexOf("src") != -1){
        result = texto.replace(/src="/i, "") + ".png"
    }else{
        result = texto.replace(/title="/i, "")
    }
    return result.replace("\"", "")
}

// verifica o se o local storage está vazio
function verifyLocaStorage(){
    var obj = JSON.parse(window.localStorage.getItem("SEIConfig"))
    if(obj == null){
        window.localStorage.setItem("SEIConfig",JSON.stringify({
            "menuHabilitado": false,
            "marcadorSelecionado": null,
            "marcadores": getMarcadores(getMarcadoresURL())
        }))
        document.location.reload()
    }
}

verifyLocaStorage();
