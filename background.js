function receive(request, sender, sendResponse){
    //console.log("mensagem recebida");
    //console.log(sender);
    //console.log(request);
    chrome.notifications.create({
        "type": "basic",
        "iconUrl": "images/warning.png",
        "title": "SEI: aviso",
        "message": "Você possui processos próximos ao prazo."
    });
    console.log(request)
    sendResponse({response: "complete"});
}
chrome.runtime.onMessage.addListener(receive);