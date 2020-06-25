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
        criarCopia : function(app){
            var doc = app.activeDocument;
            var name = doc.name.replace (".psd", "") + "_temp.psd"
             var arquivoCopia = app.documents.add(doc.width, doc.height, doc.resolution, name);
             for(var contador = doc.layers.length - 1; contador >= 0; contador--){
                app.activeDocument = doc;
                doc.layers[contador].duplicate(arquivoCopia);
            }    
            
            app.activeDocument = arquivoCopia;
            for(var contador = arquivoCopia.layers.length - 1; contador >= 0; contador--){
                var nomeAtual = arquivoCopia.layers[contador].name;
                if(nomeAtual == "Plano de Fundo"){
                    arquivoCopia.layers[contador].remove();
                    break;
                }
            }
        
            app.activeDocument = doc;
            return arquivoCopia;
        },   
    
        diminuirEscala : function(doc, escala){
            if(escala == 0) return;
            var novaLargura = parseInt(doc.width / escala);
            //var novaHaltura  = parseInt(doc.height / escala);
            //doc.resizeCanvas (novaLargura, novaHaltura, AnchorPosition.MIDDLECENTER);
            doc.resizeImage(UnitValue(novaLargura ,"px"), null, null, ResampleMethod.BICUBIC);
        },
    
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