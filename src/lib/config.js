class Config {
    marcadorSelecionado = {}
    marcadores = []
    menuHabilitado = false
    alarmConfig = new AlarmConfig()

    constructor(){
        var obj = JSON.parse(window.localStorage.getItem("SEIConfig"))

        if(obj == null){
            this.update()
        }else{
            this.marcadorSelecionado = obj.marcadorSelecionado
            this.marcadores = obj.marcadores
            this.menuHabilitado = obj.menuHabilitado
            this.tempoDeLimpeza = obj.tempoDeLimpeza
        }

    }
    
    update(){
        window.localStorage.setItem("SEIConfig",JSON.stringify(this))
    }
}

var config = new Config()