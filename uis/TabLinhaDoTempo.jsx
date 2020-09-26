#include "../factory/FactoryMenuComponents.jsx"
#include "../factory/FactoryManagerLayers.jsx"

#include "../funcionalidades/LinhaDoTempo.jsx"

var TabLinhaDoTempo = function(){

    const factoryMenuComponents = new FactoryMenuComponents();  
    const managerLayers    = new FactoryManagerLayers();  
    const arrayTempos = [0.1, 0.2, 0.5, 1, 2, 5, 10];
    const valoresTempo = [0.100000, 0.200000, 0.500000, 1.000000, 2.000000, 5.000000, 10.000000];

    var indiceGrupoEscolhido = 0;

    function criarTabLinhaDoTempo(doc, dlg, painel){
        var tabLinhaDoTempo = painel.add("tab", undefined, "LinhaDoTempo");
        var groupAcao = factoryMenuComponents.createGroup(tabLinhaDoTempo, "Grupo Acao:"); 

        var layersOrganizados = managerLayers.organizarLayers(doc.layers);
        var dlgList = groupAcao.add("listbox", undefined, layersOrganizados.arrayNickNames);
        dlgList.onChange = function(){
            indiceGrupoEscolhido = dlgList.selection.index;        
        };

        var groupLinhaDoTempo = factoryMenuComponents.createGroup(tabLinhaDoTempo, "Linha do Tempo Grupos:");    
        var dropDown = groupLinhaDoTempo.add("dropdownlist", undefined, arrayTempos);
        dropDown.selection = 0;

        var btnLinhaDoTempo = groupLinhaDoTempo.add("button", undefined, "Processar");

        btnLinhaDoTempo.onClick = function(){

            var grupoEscolhido = managerLayers.getGrupoAcaoEscolhido(indiceGrupoEscolhido);
            managerLayers.desligarTodosGruposAcoes();
    
            var linhaDoTempo = new LinhaDoTempo();
            linhaDoTempo.criarLinhaDoTempo(grupoEscolhido, valoresTempo[dropDown.selection.index]);
            dlg.close();
        };    
    }

    return{
        criarTab : function(doc, dlg, painel){
            criarTabLinhaDoTempo(doc, dlg, painel);
        }
    }
};