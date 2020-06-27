var Util = function(){        
    
    //INNER FUNCTION DE ORDENARGRUPOPOSE
    function validarGrupoPose(arrayV){
        for(var contador = 0; contador < arrayV.length; contador++){
            var poseIt = arrayV[contador];
            if(poseIt.indice != (contador + 1)){
                throw "Foi montado layers de pose com indices invalidos.";
            }
        }
    } ;   
    
    return {
        aumentarCanvas : function(novoArq, qtdLayers){
            var doc = app.activeDocument;
            var novaLargura = doc.width * qtdLayers;
            
            app.activeDocument = novoArq;
            novoArq.resizeCanvas(novaLargura, novoArq.heigth, AnchorPosition.MIDDLELEFT);        
            
             app.activeDocument = doc;
        },
        
        ordenarArrayPorIndice : function(array){
            array.sort(function(p1, p2){
                if(p1.indice > p2.indice){
                    return 1;
                }
                if(p1.indice < p2.indice){
                    return -1;
                }                
                return 0;                                          
            });           
        
            validarGrupoPose(array);
            return array;
        }
    }
};