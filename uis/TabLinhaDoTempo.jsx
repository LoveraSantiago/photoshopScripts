#include "../factory/FactoryMenuComponents.jsx"
#include "../factory/FactoryManagerLayers.jsx"

#include "../funcionalidades/LinhaDoTempo.jsx"

var TabLinhaDoTempo = function(){

    const factoryMenuComponents = new FactoryMenuComponents();  
    const managerLayers    = new FactoryManagerLayers();  

    var indiceGrupoEscolhido = 0;

    function criarTabLinhaDoTempo(doc, painel){
        var tabLinhaDoTempo = painel.add("tab", undefined, "Linha do Tempo");
        var groupAcao = factoryMenuComponents.createGroup(tabLinhaDoTempo, "Grupo Acao:"); 

        var layersOrganizados = managerLayers.organizarLayers(doc.layers);
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
    }

    return{
        criarTab : function(doc, painel){
            criarTabLinhaDoTempo(doc, painel);
        }
    }
};