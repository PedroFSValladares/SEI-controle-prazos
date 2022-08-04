if(document.URL.indexOf("infra_configurar") != -1){
    createOptions();
    setInputValue();
    
    document.getElementById("dias").addEventListener("change", (e) => {
        chrome.storage.local.set({dias: e.target.value});
        console.log();
    });
}

function createOptions(){
    let tela = document.getElementById("divInfraAreaTelaD");
    let divConfig = document.createElement("div");
    let divTitle = document.createElement("div");
    let title = document.createElement("h1");
    let option = document.createElement("div");
    let input = document.createElement("input");
    input.type = "number";
    input.setAttribute("id", "optionInput");
    option.classList.add("option");
    option.innerHTML = "Notificar quando o processo estiver <input id='dias' type='number'> dias próximo ao prazo.";
    
    divConfig.setAttribute("id", "controle-de-prazos-config");
    divTitle.classList.add("flex-container");
    title.classList.add("titulo-controle-prazos");
    title.innerText = "Configurações do controle de prazos";
    
    divTitle.appendChild(title);
    divConfig.appendChild(divTitle);
    divConfig.appendChild(document.createElement("hr"));
    divConfig.appendChild(option);
    tela.appendChild(divConfig);

}

function setInputValue(){
    input = document.getElementById("dias");
    chrome.storage.local.get("dias", (e) => {
        input.value = e.dias;
    })
}

