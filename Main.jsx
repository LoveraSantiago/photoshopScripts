#target photoshop

#include "utils/Printagem.jsx"
#include "utils/StringPrototypes.jsx"
#include "utils/Util.jsx"

#include "factory/FactoryManagerLayers.jsx"
#include "factory/FactoryBoneManager.jsx"
#include "factory/FactoryLinhaDoTempo.jsx"
#include "factory/FactoryMenuComponents.jsx"

#include "funcionalidades/Opacidade.jsx"
#include "funcionalidades/ManipulacaoArquivo.jsx"

(function(){
    const doc = app.activeDocument;
    const factoryMenuComponents = new FactoryMenuComponents();
    const managerLayers    = new FactoryManagerLayers();
          
    const orqtLinhaDoTempo = new FactoryLinhaDoTempo();    
    const util             = new Util();
    const printagem        = new Printagem("Main");
    
    const arrayTamanhos = [1, 2, 4, 8];
        
    var layersOrganizados = managerLayers.organizarLayers(doc.layers);
    var indiceGrupoEscolhido = 0;

    var dlg = new Window('dialog',"Main", undefined, {closeButton:true});
    dlg.alignChildren = "left";    
    var tpanel = dlg.add("tabbedpanel");
    tpanel.preferredSize.width=280;
    
    //TAB PARA BONES
    //Realiza diminuicao do tamanho do desenho dividido pelo  valor de Diminuir Escala E merge de camadas contorno e cores
    //Ex:
    //Layers : "1:PeFrente:1", "1:PeFrente:2", "2:PernaFrente:1", "2:PernaFrente:2"
    var tabBones = tpanel.add("tab", undefined, "Bones");
    var groupEscala = factoryMenuComponents.createGroup(tabBones, "Diminuir escala");    
    var editTextEscala = groupEscala.add("edittext", undefined, "0");
    var btnProcessar = groupEscala.add("button", undefined, "Processar");
    btnProcessar.onClick = function(){      
       var manipulacaoArquivo = new ManipulacaoArquivo(app);         
       var arquivoCopia = manipulacaoArquivo.criarCopia(app);     

       var managerBones = new FactoryBoneManager();  
       managerBones.processarLayers(app, doc, arquivoCopia);              
       util.diminuirEscala(arquivoCopia, parseInt (editTextEscala.text));
       dlg.close();
    };

    var groupVisibilidade = factoryMenuComponents.createGroup(tabBones, "Todas Camadas Visiveis");        
    var btnOpacidade = groupVisibilidade.add("button", undefined, "Processar");
    btnOpacidade.onClick = function(){
        var opacidade = new Opacidade();
        opacidade.todasCamadasVisiveis(doc);
    };    
    
    //TAB DE SPRITES
    //Ex:
    //Layer Pasta : "ACAO:1:FOGO"
    //Layer Frames: "POSE:3", "POSE:2", "POSE:1"
    var tabLinhaDoTempo = tpanel.add("tab", undefined, "Sprites");
    var groupAcao = factoryMenuComponents.createGroup(tabLinhaDoTempo, "Grupo Acao:");    
    var dlgList = groupAcao.add("listbox", undefined, layersOrganizados.arrayNickNames);
    dlgList.onChange = function(){
        indiceGrupoEscolhido = dlgList.selection.index;        
    };
    
    var groupLinhaDoTempo = factoryMenuComponents.createGroup(tabLinhaDoTempo, "Linha do Tempo Grupos:");        
    var btnLinhaDoTempo = groupLinhaDoTempo.add("button", undefined, "Processar");
    btnLinhaDoTempo.onClick = function(){
        managerLayers.criarLinhaDoTempo(indiceGrupoEscolhido);        
        dlg.close();
    };    
    
    var groupSpriteSheet = factoryMenuComponents.createGroup(tabLinhaDoTempo, "SpriteSheet escala:");            
    var dropDown = groupSpriteSheet.add("dropdownlist", undefined, arrayTamanhos);
    dropDown.selection = 0;
    var btnSpritesheet = groupSpriteSheet.add("button", undefined, "Processar");
    btnSpritesheet.onClick = function(){
        managerLayers.criarSpriteSheet(indiceGrupoEscolhido, dropDown.selection.index);        
        dlg.close();
    };    

    //TAB DE HELPERS
    //var tabHelper = tpanel.add("tab", undefined, "Helpers");   

    //INICIANDO O DIALOGO NO PAINEL 0
    tpanel.selection = 0;
    dlg.show();    

    printagem.printar("fim");
})();