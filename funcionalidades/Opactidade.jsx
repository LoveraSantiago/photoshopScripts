var Opacidade = function(){    
    
    function isLayerVisivel(artLayer){
        if(!artLayer.visible){
            return false;
        }
        if(artLayer.opacity != 100){
            return false;
        }
        if(artLayer.fillOpacity != 100){
            return false;
        }
        return true;
    }

     function tornarLayerVisivel(artLayer){
         artLayer.visible = true;
         artLayer.opacity = 100;        
         artLayer.fillOpacity = 100;
     }
    
    return{
            todasCamadasVisiveis : function(doc){
                var layers = doc.layers;
                for(var contador = 0; contador< layers.length; contador++){
                    if(layers[contador].typename == "ArtLayer"){                        
                        var layerIt = layers[contador]
                        if(!isLayerVisivel(layerIt)){
                            tornarLayerVisivel(layerIt);
                        }                        
                    }
                }
            }
        
    }
};