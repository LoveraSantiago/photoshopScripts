var manipulacaoArquivo = function(app){
    var application = app;
    return{
        criarCopia : function(){
            var doc = application.activeDocument;
            var name = doc.name.replace (".psd", "") + "_temp.psd"
             var arquivoCopia = application.documents.add(doc.width, doc.height, doc.resolution, name);
             for(var contador = doc.layers.length - 1; contador >= 0; contador--){
                application.activeDocument = doc;
                doc.layers[contador].duplicate(arquivoCopia);
            }    
            
            application.activeDocument = arquivoCopia;
            for(var contador = arquivoCopia.layers.length - 1; contador >= 0; contador--){
                var nomeAtual = arquivoCopia.layers[contador].name;
                if(nomeAtual == "Plano de Fundo"){
                    arquivoCopia.layers[contador].remove();
                    break;
                }
            }
        
            application.activeDocument = doc;
            return arquivoCopia;
        },

        diminuirEscala : function(doc, escala){
            if(escala == 0) return;
            var novaLargura = parseInt(doc.width / escala);
            doc.resizeImage(UnitValue(novaLargura ,"px"), null, null, ResampleMethod.BICUBIC);
        }
    }
};