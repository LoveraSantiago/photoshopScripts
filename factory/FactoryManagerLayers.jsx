#include "FactoryGrupoAcao.jsx"
#include "../utils/Util.jsx"

var FactoryManagerLayers = function(){    
    const factoryGrupoAcao = new FactoryGrupoAcao();     
    const util             = new Util();        
    
    var arrayGrupoAcao = [];
    
    return {
        organizarLayers : function(layers){            
            
            var nickNameLayers = [];
            
             for(var contador = 0; contador < layers.length; contador++){
                 if(layers[contador].typename == "LayerSet" && 
                    factoryGrupoAcao.isGrupoAcao(layers[contador])){                        
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

        getArrayDeGrupoAcoes : function(){
            return arrayGrupoAcao;
        },
    
        getGrupoAcaoEscolhido : function(indice){
            return arrayGrupoAcao[indice];
        },

        getQtddGrupos : function(){
            return arrayGrupoAcao.length;
        },

        desligarTodosGruposAcoes : function(){
            for(var contador = 0; contador < arrayGrupoAcao.length; contador++){
                arrayGrupoAcao[contador].desligar();
            }
        }     
    }
};