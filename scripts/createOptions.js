if(document.URL.indexOf("infra_configurar") != -1){
    let tela = document.getElementById("divInfraAreaTelaD");
    let divConfig = document.createElement("div");
    let divTitle = document.createElement("div");
    let title = document.createElement("h1");
    let option = document.createElement("div");
    let input = document.createElement("input");
    input.type = "number";
    input.setAttribute("id", "optionInput");
    option.classList.add("option");
    let label = document.createElement("label");
    label.setAttribute("for", "optionInput");
    label.innerText = "dias para aviso"
    option.appendChild(label);
    option.appendChild(input);

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