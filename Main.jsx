#target photoshop

#include "utils/Printagem.jsx"
#include "utils/StringPrototypes.jsx"

#include "factory/FactoryManagerLayers.jsx"
#include "factory/FactoryBoneManager.jsx"
#include "factory/FactoryMenuComponents.jsx"

#include "funcionalidades/Opacidade.jsx"
#include "funcionalidades/ManipulacaoArquivo.jsx"
#include "funcionalidades/LinhaDoTempo.jsx"
#include "funcionalidades/SpriteSheet.jsx"

(function(){
    const doc = app.activeDocument;
    const factoryMenuComponents = new FactoryMenuComponents();           
    const printagem        = new Printagem("Main");    
    
    const managerLayers    = new FactoryManagerLayers();          
    var layersOrganizados = managerLayers.organizarLayers(doc.layers);
    
    const arrayTamanhos = [1, 2, 4, 8];
    var indiceGrupoEscolhido = 0;

    var dlg = new Window('dialog',"Main", undefined, {closeButton:true});
    dlg.alignChildren = "left";    
    var tpanel = dlg.add("tabbedpanel");
    tpanel.preferredSize.width=280;    
    
    var tabBones = tpanel.add("tab", undefined, "Bones");
    var groupEscala = factoryMenuComponents.createGroup(tabBones, "Diminuir escala");    
    var editTextEscala = groupEscala.add("edittext", undefined, "0");
    var btnProcessar = groupEscala.add("button", undefined, "Processar");
    btnProcessar.onClick = function(){      
       var manipulacaoArquivo = new ManipulacaoArquivo(app);         
       var arquivoCopia = manipulacaoArquivo.criarCopia();     

       var managerBones = new FactoryBoneManager();  
       managerBones.processarLayers(app, doc, arquivoCopia);              
       manipulacaoArquivo.diminuirEscala(arquivoCopia, parseInt(editTextEscala.text));
       dlg.close();
    };

    var groupVisibilidade = factoryMenuComponents.createGroup(tabBones, "Todas Camadas Visiveis");        
    var btnOpacidade = groupVisibilidade.add("button", undefined, "Processar");
    btnOpacidade.onClick = function(){
        var opacidade = new Opacidade();
        opacidade.todasCamadasVisiveis(doc);
    };       
    
    var tabLinhaDoTempo = tpanel.add("tab", undefined, "Sprites");
    var groupAcao = factoryMenuComponents.createGroup(tabLinhaDoTempo, "Grupo Acao:");    
    var dlgList = groupAcao.add("listbox", undefined, layersOrganizados.arrayNickNames);
    dlgList.onChange = function(){
        indiceGrupoEscolhido = dlgList.selection.index;        
    };
    
    var groupLinhaDoTempo = factoryMenuComponents.createGroup(tabLinhaDoTempo, "Linha do Tempo Grupos:");        
    var btnLinhaDoTempo = groupLinhaDoTempo.add("button", undefined, "Processar");
    btnLinhaDoTempo.onClick = function(){

        var grupoEscolhido = managerLayers.getGrupoAcaoEscolhido(indiceGrupoEscolhido);
        managerLayers.desligarTodosGruposAcoes();

        var linhaDoTempo = new LinhaDoTempo();
        linhaDoTempo.criarLinhaDoTempo(grupoEscolhido);
        dlg.close();
    };    
    
    var groupSpriteSheet = factoryMenuComponents.createGroup(tabLinhaDoTempo, "SpriteSheet escala:");            
    var dropDown = groupSpriteSheet.add("dropdownlist", undefined, arrayTamanhos);
    dropDown.selection = 0;
    var btnSpritesheet = groupSpriteSheet.add("button", undefined, "Processar");
    btnSpritesheet.onClick = function(){
        var grupoEscolhido = managerLayers.getGrupoAcaoEscolhido(indiceGrupoEscolhido);
        var layersNomes = grupoEscolhido.getNomesLayerPoses();

        var manipulacaoArquivo = new ManipulacaoArquivo(app);         
        var arquivoCopia = manipulacaoArquivo.criarCopiaComLayers(layersNomes);  
        
        var tamanhoOriginal = arquivoCopia.width;
        manipulacaoArquivo.aumentarCanvas(arquivoCopia, layersNomes.length);

        var spriteSheet = new SpriteSheet(app);
        spriteSheet.criarSpriteSheet(tamanhoOriginal, arquivoCopia, dropDown.selection);        
        dlg.close();
    };    

    //TAB DE HELPERS
    //var tabHelper = tpanel.add("tab", undefined, "Helpers");   

    //INICIANDO O DIALOGO NO PAINEL 0
    tpanel.selection = 0;
    dlg.show();    

    printagem.printar("fim");
})();