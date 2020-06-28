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
        isContidoNoArray : function(valor, array){
            for(var contador = 0; contador < array.length; contador++){
                if(array[contador] == valor) return true;
            }
            return false;
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