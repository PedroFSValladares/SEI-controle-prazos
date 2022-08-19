if(document.title === "SEI - Processo"){
    setTimeout(() => {
        init();
    },1500);
}

function init(){
    var iFrameBody = document.getElementById("ifrVisualizacao").contentWindow.document;
    var divAcoes = iFrameBody.getElementById("divArvoreAcoes");
    var btn = createButton(iFrameBody);
    console.log(iFrameBody)
    console.log(divAcoes)
    divAcoes.appendChild(btn);
}
function createButton(body){
    var button = body.createElement("a");
    var buttonImg = body.createElement("img");
    var imageURL = chrome.runtime.getURL("./images/prazo-icone.png")

    buttonImg.src = imageURL;
    buttonImg.classList.add("infraCorBarraSistema")
    button.appendChild(buttonImg);
    button.classList.add("botaoSEI");
    button.href = "#";

    return button;
}
function createPopup(body){
    var popup = body.createElement("div");
}