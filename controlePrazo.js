if(document.title === "SEI - Processo"){
    init();
}

function init(){
    var button = document.createElement("button");
    var div = document.querySelector("#divInfraAreaTelaD #divArvoreAcoes");
    button.classList.add("botaoSEI");
    console.log(div);
    div.appendChild(button);
}