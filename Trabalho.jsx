#target photoshop

#include "utils/Printagem.jsx"
#include "utils/StringPrototypes.jsx"
#include "utils/Util.jsx"

#include "factory/FactoryManagerLayers.jsx"
#include "factory/FactoryBoneManager.jsx"
#include "factory/FactoryLinhaDoTempo.jsx"

#include "funcionalidades/Helper.jsx"

(function(){
    const doc = app.activeDocument;
    const printagem       = new Printagem("Trabalho");
    const util                  = new Util();
    const managerLayers = new FactoryManagerLayers(util);
    const managerBones = new FactoryBoneManager();        
    const orqtLinhaDoTempo = new FactoryLinhaDoTempo();
    const helper             = new Helper();
    
    const arrayTamanhos = [1, 2, 4, 8];
        
    var layersOrganizados = managerLayers.organizarLayers(doc.layers);
    var indiceGrupoEscolhido = 0;

    var dlg = new Window('dialog',"Trabalho", undefined, {closeButton:true});
    dlg.alignChildren = "left";    
    var tpanel = dlg.add("tabbedpanel");
    tpanel.preferredSize.width=280;
    
    //TAB PARA BONES
    //Realiza diminuicao do tamanho do desenho dividido pelo  valor de Diminuir Escala E merge de camadas contorno e cores
    //Ex:
    //Layers : "1:PeFrente:1", "1:PeFrente:2", "2:PernaFrente:1", "2:PernaFrente:2"
    var tabBones = tpanel.add("tab", undefined, "Bones");
    var group = tabBones.add("group");
    group.orientation = "row";
    group.add("statictext", undefined, "Diminuir escala");
    var editTextEscala = group.add("edittext", undefined, "0");
    var btnProcessar = group.add("button", undefined, "Processar");
    btnProcessar.onClick = function(){                
       var arquivoCopia = util.criarCopia(app);       
       managerBones.processarLayers(app, doc, arquivoCopia);              
       util.diminuirEscala(arquivoCopia, parseInt (editTextEscala.text));
       dlg.close();
    }
    var group2 = tabBones.add("group");
    group2.orientation = "row";
    group2.add("statictext", undefined, "Todas Camadas Visiveis");
    var btnOpacidade = group2.add("button", undefined, "Processar");
    btnOpacidade.onClick = function(){
        helper.opacidade100(doc);
    };    
    
    //TAB DE SPRITES
    //Ex:
    //Layer Pasta : "ACAO:1:FOGO"
    //Layer Frames: "POSE:3", "POSE:2", "POSE:1"
    var tabLinhaDoTempo = tpanel.add("tab", undefined, "Sprites");
    var group3 = tabLinhaDoTempo.add("group");
    group3.orientation = "row";        
    group3.add("statictext", undefined, "Grupo Acao:");
    var dlgList = group3.add("listbox", undefined, layersOrganizados.arrayNickNames);
    dlgList.onChange = function(){
        indiceGrupoEscolhido = dlgList.selection.index;        
    };
    
    var group4 = tabLinhaDoTempo.add("group");
    group4.orientation = "row";        
    group4.add("statictext", undefined, "Linha do Tempo Grupos");    
    var btnLinhaDoTempo = group4.add("button", undefined, "Processar");
    btnLinhaDoTempo.onClick = function(){
        managerLayers.criarLinhaDoTempo(indiceGrupoEscolhido);        
        dlg.close();
    };    
    
    var group5 = tabLinhaDoTempo.add("group");
    group5.orientation = "row";    
    group5.add("statictext", undefined, "SpriteSheet escala:");
    var dropDown = group5.add("dropdownlist", undefined, arrayTamanhos);
    dropDown.selection = 0;
    var btnSpritesheet = group5.add("button", undefined, "Processar");
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