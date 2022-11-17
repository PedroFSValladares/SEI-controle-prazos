// Cria a a base das tabelas
function criarTabela(id, title, headers){
    var table = document.createElement("table")
    var form = document.getElementById("frmProcedimentoControlar");
    var tableHead = document.createElement("thead");
    var container = document.createElement("div");
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

    container.id = "div" + id
    table.classList.add("table");
    divTabela.appendChild(table);
    container.appendChild(divTabela);

    return container;
}

// realiza ajustes na tabela de processos com prazo
function formatarTabelaPrazos(){
    var tableHead = $("#tblProcessosPrazos thead")[0]
    tableHead.children[4].textContent = "Prazo";
}

// realiza ajustes na tabela de processos filtrados
function formatarTabelaFiltrados(){
    var config = JSON.parse(window.localStorage.getItem("SEIConfig"))

    var tableHead = $("#tblProcessosFiltrados thead")[0]
    var buttonConfig = document.createElement("a")
    var configIcon = document.createElement("img")
    var caption = document.createElement("caption")
    $(caption).addClass("infraCaption")
    $(caption).insertBefore("#tblProcessosFiltrados thead")
    buttonConfig.appendChild(configIcon)
    configIcon.src = getIconUrl("./images/icons/config.png")

    tableHead.children[3].appendChild(buttonConfig)
    $(buttonConfig).click(() => {
        $(".janelaOpcoes").toggle()
    })
}

// cria o painel de configuração da tabela de processos filtrados
function criarJanelaConfiguracao(){
    var config = getConfig()
    var janela = document.createElement("div")
    var select = document.createElement("select");
    var closeButton = document.createElement("a")
    var closeIcon = document.createElement("img")
    var posicaoTabela = $(".divPrazosAreaTabela").position()
    var posicaoJanela
    
    $(closeIcon).attr("src", getIconUrl("./images/icons/close.png"))
    $(closeButton).click(() => {
        $(janela).hide()
    })
    $(closeButton).append(closeIcon)
    
    
    $(select).addClass("opcoes")
    $(janela).append(closeButton)
    $(janela).append(select)
    $(janela).addClass("janelaOpcoes")
    $(janela).hide()
    
    $(select).on("change", (e) => {
        var obj = getConfig();
        obj.marcadorSelecionado = $(select).val()
        setConfig(obj)
        document.location.reload()
    })
    
    $(select).append(document.createElement("option"))
    config.marcadores.forEach((marcador) => {
        var option = document.createElement("option")
        var text = marcador.titulo
        
        $(option).append(text) 
        $(select).append(option)
    })

    if(config.marcadorSelecionado !== null && config.marcadorSelecionado !== undefined){
        $(select).val(config.marcadorSelecionado)
    }
    
    $(janela).insertBefore("#tblProcessosFiltrados")
}

//cria o botão para habilitar e desabilitar a tabela de processos filtrados 
function createOptionFiltro(){
    var config = getConfig()
    var linkDiv = document.createElement("div")
    var link = document.createElement("a")

    $(link).text(config.menuHabilitado ? "Desabilitar filtro" : "Habilitar filtro") 
    $(link).addClass("ancoraPadraoPreta")
    $(linkDiv).attr("id", "divFiltrarProcessos") 

    $(linkDiv).append(link)
    $("#divMeusProcessos").after(linkDiv)

    $(link).click(() => {
        config.menuHabilitado = !config.menuHabilitado
        setConfig(config)
        document.location.reload()
    })
}

function getConfig(){
    return JSON.parse(window.localStorage.getItem("SEIConfig"))
}

function setConfig(config){ 
    window.localStorage.setItem("SEIConfig", JSON.stringify(config))
}

function getIconUrl(path){
    if(typeof browser === "undefined"){
        return chrome.runtime.getURL(path)
    }else{
        return browser.runtime.getURL(path)
    }
}

$("#divGerados").after(criarTabela("Prazos", "Sujeitos a Prazo", 5))
if(JSON.parse(window.localStorage.getItem("SEIConfig")).menuHabilitado){
    $("#divPrazos").after(criarTabela("Filtrados", "Filtrados", 4))
    formatarTabelaFiltrados()
    criarJanelaConfiguracao()
}
createOptionFiltro()
formatarTabelaPrazos()

//criarTabela();