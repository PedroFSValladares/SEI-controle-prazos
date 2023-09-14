class Config {
    marcadorSelecionado
    marcadores
    menuHabilitado

    constructor(){
        var obj = JSON.parse(window.localStorage.getItem("SEIConfig"))

        if(obj == null){
            this.marcadorSelecionado = {}
            this.marcadores = []
            this.menuHabilitado = false

            window.localStorage.setItem("SEIConfig",JSON.stringify(this))
        }else{
            this.marcadorSelecionado = obj.marcadorSelecionado
            this.marcadores = obj.marcadores
            this.menuHabilitado = obj.menuHabilitado
        }

    }
    
    update(){
        window.localStorage.setItem("SEIConfig",JSON.stringify(this))
    }
}

var config = new Config()