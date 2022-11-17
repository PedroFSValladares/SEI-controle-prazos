var config = JSON.parse(window.localStorage.getItem("SEIConfig"))
var marcadores = Array.from(config.marcadores)
var marcadorObj

// atualiza contagem de registros
function attRegistros(qtdt){
    var txt = $("#tblProcessosRecebidos .infraCaption").text().replace(/[:]/gi, "").split(" ")
    var valores = txt.filter(element => $.isNumeric(element))
    $("#tblProcessosRecebidos .infraCaption").text(`${valores[0] - qtdt} registros - ${valores[1]} a 
    ${valores[2] == valores[0] ? valores[0] - qtdt : valores[2]}:`)
}

// realiza a filtragem dos registros caso esteja habilitada
if(config.menuHabilitado && config.marcadorSelecionado != null){
    var processos = Array.from($(`#divRecebidosAreaTabela tbody tr`))
    marcadores.forEach((element) => {
        if(element.titulo === config.marcadorSelecionado){
            marcadorObj = element
        }
    })
    
    var procs = document.querySelectorAll(`img[src='${marcadorObj.simbolo}']`)
    var aFiltrar = Array.from(procs)
    $("#tblProcessosFiltrados .infraCaption").text(`${aFiltrar.length} registros`)
    attRegistros(aFiltrar.length)
    $("#tblProcessosRecebidos .infraCaption")
    aFiltrar.forEach((element) => {
        var processo = element.parentElement.parentElement.parentElement
        if(!$(processo).hasClass("ComPrazo")){
            $("#tblProcessosFiltrados").append(processo)
        }
    })
}