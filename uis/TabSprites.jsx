#include "../factory/FactoryMenuComponents.jsx"
#include "../factory/FactoryManagerLayers.jsx"

#include "../funcionalidades/ManipulacaoArquivo.jsx"
#include "../funcionalidades/SpriteSheet.jsx"

var TabSprites = function(){

    const factoryMenuComponents = new FactoryMenuComponents();  
    const managerLayers    = new FactoryManagerLayers();  
    const arrayTamanhos = [1, 2, 4, 8];

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
        
        criarGrupoProcessamentoPorAcao(app, dlg, tabSprites);
        criarGrupoProcessamentoGeral(app, dlg, tabSprites);
    }
    
    function criarGrupoProcessamentoPorAcao(app, dlg, tabSprites){
        var groupSpriteSheetPorAcao = factoryMenuComponents.createGroup(tabSprites, "SpriteSheet por acao:");   
        groupSpriteSheetPorAcao.add("statictext", undefined, "Tam:");
        var dropDown = groupSpriteSheetPorAcao.add("dropdownlist", undefined, arrayTamanhos);
        
        dropDown.selection = 0;
        var btnSpritesheet = groupSpriteSheetPorAcao.add("button", undefined, "Processar");
        btnSpritesheet.onClick = function(){
            var grupoEscolhido = managerLayers.getGrupoAcaoEscolhido(indiceGrupoEscolhido);        
    
            var manipulacaoArquivo = new ManipulacaoArquivo(app);         
            var arquivoCopia = manipulacaoArquivo.criarCopiaComLayers(grupoEscolhido.originalName);  
            var tamanhoOriginal = arquivoCopia.width;

            manipulacaoArquivo.aumentarCanvas(arquivoCopia, grupoEscolhido.getQtddPoses(), 1);            
    
            var spriteSheet = new SpriteSheet(app);
            spriteSheet.criarSpriteSheet(tamanhoOriginal, arquivoCopia, arrayTamanhos[dropDown.selection.index]);        
            dlg.close();
        };    
    }

    function criarGrupoProcessamentoGeral(app, dlg, tabSprites){
        var groupSpriteSheetGeral = factoryMenuComponents.createGroup(tabSprites, "SpriteSheet geral:");   
        groupSpriteSheetGeral.add("statictext", undefined, "Tam:");         
        var dropDown = groupSpriteSheetGeral.add("dropdownlist", undefined, arrayTamanhos);
        var btnSpritesheet = groupSpriteSheetGeral.add("button", undefined, "Processar");

        dropDown.selection = 0;
        btnSpritesheet.onClick = function(){
            var grupoTemp = managerLayers.getGrupoAcaoEscolhido(0); 
                
            var manipulacaoArquivo = new ManipulacaoArquivo(app);    
            var arquivoCopia = manipulacaoArquivo.criarCopiaComTodosOsLayers();
            
            var larguraOriginal = arquivoCopia.width;
            var halturaOriginal = arquivoCopia.height;
            
            manipulacaoArquivo.aumentarCanvas(arquivoCopia, grupoTemp.getQtddPoses(), managerLayers.getQtddGrupos());

            var spriteSheet = new SpriteSheet(app);
            spriteSheet.criarSpriteSheetGeral(larguraOriginal, halturaOriginal, arquivoCopia, managerLayers.getArrayDeGrupoAcoes(), arrayTamanhos[dropDown.selection.index]);

            dlg.close();
        };    
    }

    return{
        criarTab : function(app, doc, dlg, painel){
            criarTabSprite(app, doc, dlg, painel);
        }
    }
};