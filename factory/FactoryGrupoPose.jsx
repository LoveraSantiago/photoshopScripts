var FactoryGrupoPose = function(){    
    const POSE = "POSE:";
    
    return{
        isGrupoPose : function(layer){
            return layer.name.startsWith(POSE);
        },     
    
        criarGrupoPose : function(layerSet){
            var splits = layerSet.name.split(":")
            
            return{//OBJETO GRUPOPOSE
                originalName : layerSet.name,
                grupo        : parseInt(splits[1]),
                indice       : parseInt(splits[2]),
                layer        : layerSet,
                desligar     : function(){
                    this.layer.visible = false;
                },
                ligar        : function(){
                    this.layer.visible = true;
                }
            }
        }    
    }
};