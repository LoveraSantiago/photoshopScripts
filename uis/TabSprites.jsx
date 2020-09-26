#include "../factory/FactoryMenuComponents.jsx"
#include "../factory/FactoryManagerLayers.jsx"

#include "../funcionalidades/ManipulacaoArquivo.jsx"
#include "../funcionalidades/SpriteSheet.jsx"

var TabSprites = function(){

    const factoryMenuComponents = new FactoryMenuComponents();  
    const managerLayers    = new FactoryManagerLayers();  

    var indiceGrupoEscolhido = 0;

    function criarTabSprite(app, doc, dlg, painel){
        var tabSprites = painel.add("tab", undefined, "Sprites");
        //Refatorar com tablinhadotempo
        var groupAcao = factoryMenuComponents.createGroup(tabSprites, "Grupo Acao:");   

        var layersOrganizados = managerLayers.organizarLayers(doc.layers);
        var dlgList = groupAcao.add("listbox", undefined, layersOrganizados.arrayNickNames);
        dlgList.onChange = function(){
            indiceGrupoEscolhido = dlgList.selection.index;        
        };   
        
        var groupSpriteSheet = factoryMenuComponents.createGroup(tabSprites, "SpriteSheet escala:");            
        var dropDown = groupSpriteSheet.add("dropdownlist", undefined, arrayTamanhos);
        dropDown.selection = 0;
        var btnSpritesheet = groupSpriteSheet.add("button", undefined, "Processar");
        btnSpritesheet.onClick = function(){
            var grupoEscolhido = managerLayers.getGrupoAcaoEscolhido(indiceGrupoEscolhido);        
    
            var manipulacaoArquivo = new ManipulacaoArquivo(app);         
            var arquivoCopia = manipulacaoArquivo.criarCopiaComLayers(grupoEscolhido.originalName);  
            
            var tamanhoOriginal = arquivoCopia.width;
            manipulacaoArquivo.aumentarCanvas(arquivoCopia);
    
            var spriteSheet = new SpriteSheet(app);
            spriteSheet.criarSpriteSheet(tamanhoOriginal, arquivoCopia, arrayTamanhos[dropDown.selection.index]);        
            dlg.close();
        };    
    }

    return{
        criarTab : function(app, doc, dlg, painel){
            criarTabSprite(app, doc, dlg, painel);
        }
    }
};