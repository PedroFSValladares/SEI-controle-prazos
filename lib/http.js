class Http {
    httpRequest = new XMLHttpRequest()
    response

    constructor(){
        /*
        request.onreadystatechange = function(){
            if(httpRequest.readyState === 4){
                if(httpRequest.status === 200){
                    this.response = httpRequest.responseText
                }else{
                    console.log("falha na requisição.")
                }
            }
        }
        */
    }

    // obtem a página com a lista de marcadores
    request(url, method){    
        this.httpRequest.open(method, url, false)
        this.httpRequest.send(null);
        return this.httpRequest.responseText
    }
}

var http = new Http()