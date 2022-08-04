chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("mensagem recebida");
    //console.log(sender);
    //console.log(request.solicitacao);
    chrome.notifications.create({
        "type": "basic",
        "iconUrl": "images/warning.png",
        "title": "SEI: aviso",
        "message": "Você possui processos próximos ao prazo."
    });
    sendResponse();
});
chrome.runtime.onInstalled.addListener(() => {
    console.log("------------------");
    chrome.storage.local.set({dias: 2})
});
