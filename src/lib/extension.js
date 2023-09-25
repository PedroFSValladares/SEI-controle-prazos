class Extension {
    static getIconUrl(path){
        if(typeof browser === "undefined"){
            return chrome.runtime.getURL(path)
        }else{
            return browser.runtime.getURL(path)
        }
    }
}