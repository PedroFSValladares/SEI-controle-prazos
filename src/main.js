/*
var textBody = htmlExtractor.getPaginationUrl(1)
var requestUrl = htmlExtractor.getFormUrl()
data = new FormData(document.getElementById("frmProcedimentoControlar"))
data.set("hdnRecebidosPaginaAtual", 1)
//console.log(htmlExtractor.getProcessFromHTML(http.request(requestUrl,"post", data)))
//form do menu
var form = document.getElementById("frmProcedimentoControlar")
*/



var divGerados = document.getElementById("divGeradosAreaTabela")
var menu = document.getElementById("divFiltro")

var tblPrazosContainer = new Container("Prazos")
var tablePrazos = new TablePrazos("Prazos", "Sujeitos a Prazo", 5)
tblPrazosContainer.root.appendChild(tablePrazos.root)
divGerados.after(tblPrazosContainer.root)

if(config.menuHabilitado){
    var tblFiltradosContainer = new Container("Filtrados")
    var janelaConfig = new JanelaConfiguracao()
    tblFiltradosContainer.root.appendChild(janelaConfig.root)
    var tableFiltrados = new TableFiltrados("Filtrados", "Filtrados", 4)
    tblFiltradosContainer.root.appendChild(tableFiltrados.root)
    tblPrazosContainer.root.after(tblFiltradosContainer.root)
}

var linktabelaFiltro = new LinktabelaFiltro()
menu.appendChild(linktabelaFiltro.root)

if(config.marcadores.length <= 0){
    var marcadoresRaw = http.request(htmlExtractor.extractMarcadorUrl(), "GET")
    config.marcadores = htmlExtractor.extrairMarcadores(marcadoresRaw)
    config.update()
    //document.location.reload()
}
