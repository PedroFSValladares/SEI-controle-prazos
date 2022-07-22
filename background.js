chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    /*
    console.log(tabId)
    console.log(change)
    console.log(tab)
    */
   if(change.title === "SEI - Controle de Processos"){
       console.log("Logado no SEI");
    }
    console.log(tab.status)
    if(tab.url.indexOf("sei") !== -1 && tab.status === "complete"){
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["mailer.js", "warning.js"],
        })    
    }
})
