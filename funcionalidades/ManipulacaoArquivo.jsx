#include "../utils/Util.jsx"

#include "../factory/FactoryGrupoPose.jsx"
#include "../factory/FactoryGrupoAcao.jsx"

var ManipulacaoArquivo = function(app){

    const util = new Util();
    const factoryGrupoPose = new FactoryGrupoPose();
    const factoryGrupoAcao = new FactoryGrupoAcao();
    var application = app;

    function fazerCopia(doc){        
        var name = doc.name.replace (".psd", "") + "_temp.psd";
        var arquivoCopia = application.documents.add(doc.width, doc.height, doc.resolution, name);
        return arquivoCopia;
    }

    function removerLayerPlanoDeFundo(arquivo){
        var originalDoc = application.activeDocument;

        application.activeDocument = arquivo;
        for(var contador = arquivo.layers.length - 1; contador >= 0; contador--){
            var nomeAtual = arquivo.layers[contador].name;
            if(nomeAtual == "Plano de Fundo"){
                arquivo.layers[contador].remove();
                break;
            }
        }

        application.activeDocument = originalDoc;
    }

    return{
        aumentarCanvas : function(novoArq, multLargura, multHaltura){
            var doc = app.activeDocument;
            var novaLargura = doc.width * multLargura;
            var novaHaltura = doc.length * multHaltura;
            
            app.activeDocument = novoArq;
            novoArq.resizeCanvas(novaLargura, novoArq.heigth, AnchorPosition.MIDDLELEFT);        
            
             app.activeDocument = doc;
        },

        criarCopia : function(){           
            var doc = application.activeDocument;
            var arquivoCopia = fazerCopia(doc);

            for(var contador = doc.layers.length - 1; contador >= 0; contador--){
                application.activeDocument = doc;
                doc.layers[contador].duplicate(arquivoCopia);
            }

            removerLayerPlanoDeFundo(arquivoCopia);            
            return arquivoCopia;
        },

        criarCopiaComLayers : function(nomeGrupo){    
            var doc = application.activeDocument;        
            var arquivoCopia = fazerCopia(doc);

            for(var contador = doc.layers.length - 1; contador >= 0; contador--){
                application.activeDocument = doc;

                var layerAtual = doc.layers[contador];
                var nomeLayer = layerAtual.name;
                if(nomeLayer == nomeGrupo){

                    for(var subContador = layerAtual.layers.length -1; subContador >= 0; subContador--){
                        var subLayerAtual = layerAtual.layers[subContador];
                        subLayerAtual.duplicate(arquivoCopia);
                    }

                }
            }

            removerLayerPlanoDeFundo(arquivoCopia);         
            return arquivoCopia;
        },

        criarCopiaComTodosOsLayers : function(){
            var doc = application.activeDocument;        
            var arquivoCopia = fazerCopia(doc);

            for(var contador = doc.layers.length - 1; contador >= 0; contador--){
                application.activeDocument = doc;

                var layerAtual = doc.layers[contador];                          

                if(factoryGrupoAcao.isGrupoAcao(layerAtual)){
                    for(var contadorSubLayers = 0; contadorSubLayers < layerAtual.layers.length; contadorSubLayers++){
                        layerAtual.layers[contadorSubLayers].duplicate(arquivoCopia);
                    }
                }               
            }

            removerLayerPlanoDeFundo(arquivoCopia);         
            return arquivoCopia;
        },

        diminuirEscala : function(doc, escala){
            if(escala == 0) return;
            var novaLargura = parseInt(doc.width / escala);
            doc.resizeImage(UnitValue(novaLargura ,"px"), null, null, ResampleMethod.BICUBIC);
        }
    }
};