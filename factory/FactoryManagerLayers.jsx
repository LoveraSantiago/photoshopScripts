#include "FactoryGrupoAcao.jsx"
#include "../funcionalidades/LinhaDoTempo.jsx"
#include "../funcionalidades/SpriteSheet.jsx"
#include "../utils/Util.jsx"

var FactoryManagerLayers = function(){    
    const factoryGrupoAcao = new FactoryGrupoAcao();     
    const util             = new Util();
    const linhaDoTempo     = new LinhaDoTempo();
    const spriteSheet      = new SpriteSheet();
    
    var arrayGrupoAcao = [];
    
    return {
        organizarLayers : function(layers){            
            
            var nickNameLayers = [];
            
             for(var contador = 0; contador < layers.length; contador++){
                 if(layers[contador].typename == "LayerSet" && factoryGrupoAcao.isGrupoAcao(layers[contador])){                        
                     arrayGrupoAcao.push(factoryGrupoAcao.criarGrupoAcao(layers[contador]));
                 }
             }
             arrayGrupoAcao = util.ordenarArrayPorIndice(arrayGrupoAcao);
             
             for(var contador = 0; contador < arrayGrupoAcao.length; contador++){
                 nickNameLayers.push(arrayGrupoAcao[contador].nickName);
             }
            
            return{
                arrayNickNames : nickNameLayers
            }
        },
    
        getGrupoAcaoEscolhido : function(indice){
            return arrayGrupoAcao[indice];
        },
    
         criarLinhaDoTempo : function(indice){
             var grupoAcaoEscolhido = arrayGrupoAcao[indice];
             
             linhaDoTempo.limparFramesExistente();
             
             //DESABILITANDO LAYERS DE GRUPOS DE ACAO
             for(var contador = 0; contador < arrayGrupoAcao.length; contador++){
                 arrayGrupoAcao[contador].desligar();
             }
         
             linhaDoTempo.criarLinhaDoTempo ();
             grupoAcaoEscolhido.ligar();
             linhaDoTempo.criarFrames(grupoAcaoEscolhido.getQtddPoses());
             linhaDoTempo.associarLayerComFrame(grupoAcaoEscolhido.arrayPoses);
         },
     
        criarSpriteSheet : function(indice, tamanhoEscolhido){
            var grupoAcaoEscolhido = arrayGrupoAcao[indice];
            
            var arquivoCopia = util.criarCopia(app);
            var widthOriginal = arquivoCopia.width;
            util.aumentarCanvas(arquivoCopia, grupoAcaoEscolhido.getQtddPoses());
            
            spriteSheet.criarSpriteSheet(widthOriginal, arquivoCopia);
            arquivoCopia.resizeImage(UnitValue((arquivoCopia.width / tamanhoEscolhido) ,"px"), null, null, ResampleMethod.BICUBIC)
        }
     
    }
};