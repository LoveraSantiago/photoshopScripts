#target photoshop

#include "utils/Printagem.jsx"
#include "utils/StringPrototypes.jsx"

#include "factory/FactoryManagerLayers.jsx"
// #include "factory/FactoryMenuComponents.jsx"

#include "funcionalidades/ManipulacaoArquivo.jsx"
#include "funcionalidades/SpriteSheet.jsx"

#include "uis/TabBones.jsx"
#include "uis/TabLinhaDoTempo.jsx"
#include "uis/TabSprites.jsx"

(function(){
    const doc = app.activeDocument;
    // const factoryMenuComponents = new FactoryMenuComponents();           
    const printagem        = new Printagem("Main");    
    
    const managerLayers    = new FactoryManagerLayers();          
    var layersOrganizados = managerLayers.organizarLayers(doc.layers);
    
    const arrayTamanhos = [1, 2, 4, 8];
    var indiceGrupoEscolhido = 0;

    var dlg = new Window('dialog',"Main", undefined, {closeButton:true});
    dlg.alignChildren = "left";    
    var tpanel = dlg.add("tabbedpanel");
    tpanel.preferredSize.width=280;    

    var tabBones = new TabBones();
    tabBones.criarTab(app, doc, dlg, tpanel);

    var tabLinhaDoTempo = new TabLinhaDoTempo();
    tabLinhaDoTempo.criarTab(doc, dlg, tpanel);

    var tabSprites = new TabSprites();
    tabSprites.criarTab(app, doc, dlg, tpanel);
    
    // var tabSprites = tpanel.add("tab", undefined, "Sprites");
    // var groupAcao = factoryMenuComponents.createGroup(tabSprites, "Grupo Acao:");    
    // var dlgList = groupAcao.add("listbox", undefined, layersOrganizados.arrayNickNames);
    // dlgList.onChange = function(){
    //     indiceGrupoEscolhido = dlgList.selection.index;        
    // };   
    
    // var groupSpriteSheet = factoryMenuComponents.createGroup(tabSprites, "SpriteSheet escala:");            
    // var dropDown = groupSpriteSheet.add("dropdownlist", undefined, arrayTamanhos);
    // dropDown.selection = 0;
    // var btnSpritesheet = groupSpriteSheet.add("button", undefined, "Processar");
    // btnSpritesheet.onClick = function(){
    //     var grupoEscolhido = managerLayers.getGrupoAcaoEscolhido(indiceGrupoEscolhido);        

    //     var manipulacaoArquivo = new ManipulacaoArquivo(app);         
    //     var arquivoCopia = manipulacaoArquivo.criarCopiaComLayers(grupoEscolhido.originalName);  
        
    //     var tamanhoOriginal = arquivoCopia.width;
    //     manipulacaoArquivo.aumentarCanvas(arquivoCopia);

    //     var spriteSheet = new SpriteSheet(app);
    //     spriteSheet.criarSpriteSheet(tamanhoOriginal, arquivoCopia, arrayTamanhos[dropDown.selection.index]);        
    //     dlg.close();
    // };    

    //TAB DE HELPERS
    //var tabHelper = tpanel.add("tab", undefined, "Helpers");   

    //INICIANDO O DIALOGO NO PAINEL 0
    tpanel.selection = 0;
    dlg.show();    

    printagem.printar("fim");
})();