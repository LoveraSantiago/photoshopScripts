#include "../factory/FactoryBoneManager.jsx"
#include "../factory/FactoryMenuComponents.jsx"

#include "../funcionalidades/ManipulacaoArquivo.jsx"
#include "../funcionalidades/Opacidade.jsx"

#include "../utils/Printagem.jsx"

var TabBones = function(){

    const printagem        = new Printagem("TabBones");    
    const factoryMenuComponents = new FactoryMenuComponents();

    function criarTabBone(app, doc, dlg, painel){
        var tabBones = painel.add("tab", undefined, "Bones");
        var groupEscala = factoryMenuComponents.createGroup(tabBones, "Diminuir escala"); 
        var editTextEscala = groupEscala.add("edittext", undefined, "0");
        var btnProcessar = groupEscala.add("button", undefined, "Processar");

        btnProcessar.onClick = function(){      
           printagem.printar("btn processar pressionado");
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
            dlg.close();
        };       
    }

    return{
        criarTab : function(app, doc, dlg, painel){
            criarTabBone(app, doc, dlg, painel);
        }
    }
};