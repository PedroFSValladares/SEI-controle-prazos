class Extension {
    getIconUrl(path){
        if(typeof browser === "undefined"){
            return chrome.runtime.getURL(path)
        }else{
            return browser.runtime.getURL(path)
        }
    }
}

var extension = new Extension()