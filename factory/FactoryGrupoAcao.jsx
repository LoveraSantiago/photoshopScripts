#include "../utils/Printagem.jsx"
#include "../utils/Util.jsx"

#include "FactoryGrupoPose.jsx"

var FactoryGrupoAcao = function(){     
     const ACAO = "ACAO:";
     
     const printagem = new Printagem("FactoryGrupoAcao");
     const factoryGrupoPose = new FactoryGrupoPose();
     const util = new Util();
    
    return {
        isGrupoAcao : function(layer){
            return layer.name.startsWith(ACAO);            
         },       
     
         criarGrupoAcao : function(layerSet){
             var arrayPosesTemp = [];
             
             var layers = layerSet.layers;             
             for(var contador = 0; contador < layers.length; contador++){
                 var resultIsLayerSet = layers[contador].typename == "ArtLayer";
                 var resultIsGrupoPose = factoryGrupoPose.isGrupoPose(layers[contador]);
                 if(resultIsLayerSet && resultIsGrupoPose){
                     arrayPosesTemp.push(factoryGrupoPose.criarGrupoPose(layers[contador]));
                 }                 
             }
             arrayPosesTemp = util.ordenarArrayPorIndice(arrayPosesTemp);             
             
             var split = layerSet.name.split(":");
             
             return {//OBJETO GRUPO ACAO
                 originalName  : layerSet.name,
                 nickName      : split[2],
                 indice        : parseInt(split[1]),
                 layerSet      : layerSet,
                 arrayPoses    : arrayPosesTemp,

                 getQtddPoses : function(){
                     return this.arrayPoses.length;
                 },

                 getLayersPoses : function(){
                     var layers = [];
                     for(var contador = 0; contador < this.arrayPoses.length; contador++){
                         layers.push(this.arrayPoses[contador].layer);
                     }
                     return layers;
                 },

                 getPoseDoIndice : function(indice){
                    return layers[indice];
                 },

                 getNomesLayerPoses : function(){
                    var nomes = [];
                    for(var contador = 0; contador < this.arrayPoses.length; contador++){
                        nomes.push(this.arrayPoses[contador].originalName);
                    }
                    return nomes;
                 },

                 toString         : function(){
                     return "Grupo Acao :" + this.nickName;
                 },

                 desligar       : function(){
                     this.layerSet.visible = false;
                 },
                 
                 ligar            : function(){
                     this.layerSet.visible = true;
                 }
              }           
         }     
     }
};