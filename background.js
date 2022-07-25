/*
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    //console.log(tabId)
    //console.log(change)
    //console.log(tab)
    console.log(tab.status)
    if(tab.status === "complete"){
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["mailer.js", "warning.js"],
        })    
    }
})
*/
var tabId;
var pr;
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
        
    tabId = sender.tab.id;
    console.log(request)
    sendResponse({response: "complete"});
}
chrome.runtime.onMessage.addListener(receive);