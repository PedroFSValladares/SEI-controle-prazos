const fs = require("fs")
const path = require("path")

var settingsJson = fs.readFileSync("settings.json")
var settings = JSON.parse(settingsJson)
var appRoot = settings.appRoot
var appDirs = settings.includeDirs
var appEntryPoint = settings.appEntryPoint
var manifestPath = path.join(appRoot, settings.manifestPath)
var imports = []

for (let index = 0; index < appDirs.length; index++) {
    imports = imports.concat(readdirRecursive(path.join(appRoot, settings.includeDirs[index])));
}

imports.push(appEntryPoint)
imports = imports.map((element) => {return element.replace("src\\", "")}).map((element) => { return element.replaceAll("\\", "/")})

var manifestJson = fs.readFileSync(manifestPath,{encoding: "utf-8"})

var manifest = JSON.parse(manifestJson)
manifest.content_scripts[0].js = imports
manifestJson = JSON.stringify(manifest, null, 3)
fs.writeFileSync(manifestPath, manifestJson)

console.log("Dependências atualizadas.")

function readdirRecursive(dir){
    var fileStat = fs.statSync(dir)
    var files = []

    if(fileStat.isDirectory()){
        var otherDirs = fs.readdirSync(dir)
        for(var i = 0; i < otherDirs.length; i++){
            files = files.concat(readdirRecursive(path.join(dir, otherDirs[i])))
        }
    }else{
        files.push(dir)
    }
    return files
}