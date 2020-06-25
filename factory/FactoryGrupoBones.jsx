#include "../utils/Util.jsx"

var FactoryGrupoBones = function(){
    const util = new Util();    
    
    return{
        criarGrupoBone : function(indice){
            return{
                indice : indice,
                name : null,
                arrayLayers : [],
                receberLayer : function(layer){
                    var split = layer.name.split(":");
                    if(split.length != 3){
                         throw "O nome do layer nao montou o split corretamente verificar : " + layer.name;
                    }                      
                    
                    if(this.name == null){
                        this.name = split[1];
                    }
                    
                    this.arrayLayers.push({
                        indice : split[2],
                        layer : layer
                    })                    
                },
                inicializar : function(){
                    this.arrayLayers = util.ordenarArrayPorIndice(this.arrayLayers);
                    var arrayTemp = [];
                    for(var contador = 0; contador < this.arrayLayers.length; contador++){
                        arrayTemp.push(this.arrayLayers[contador].layer);
                    }
                    this.arrayLayers = arrayTemp;
                },
                mergirLayers : function(doc){
                    var layerHum = this.arrayLayers[0];
                    doc.activeLayer = layerHum;
                    for(var contador = 0; contador < this.arrayLayers.length - 1; contador++){
                        layerHum.merge();
                        //layerHum.name = doc.activeLayerdoc.activeLayer.name.split(":")[1];
                    }
                }
                
            }                            
        }
    
    }
};