var SpriteSheet = function(app, arqCopia){

    var application = app;
    var arquivoCopia = arqCopia;
    
    return {
        criarSpriteSheet : function(widthOriginal, tamanhoEscolhido){
            var doc = application.activeDocument;

            application.activeDocument = arquivoCopia;
            var posicaoX = 0;
            for(var contador = arquivoCopia.layers.length -1; contador >=0; contador--){
                 arquivoCopia.layers[contador].translate(posicaoX, 0);                    
                 posicaoX += widthOriginal;
            }
            arquivoCopia.resizeImage(UnitValue((arquivoCopia.width / tamanhoEscolhido) ,"px"), null, null, ResampleMethod.BICUBIC)

            application.activeDocument = doc;
        },
        
        criarSpriteSheetGeral : function(widthOriginal, heightOriginal, arrayGrupoAcao, tamanhoEscolhido){
            var doc = application.activeDocument;
            application.activeDocument = arquivoCopia;

            var posicaoY = 0;
            for(var contadorGrupo = 0; contadorGrupo < arrayGrupoAcao.length; contadorGrupo++){
                
                var posicaoX = 0;
                var grupoAtual = arrayGrupoAcao[contadorGrupo];
                for(var contadorPoses = 0; contadorPoses < grupoAtual.getQtddPoses(); contadorPoses++){

                    var poseAtual = grupoAtual.getPoseDoIndice(contadorPoses);
                    var nomePoseAtual = poseAtual.name;

                    for(var contadorLayers = 0; contadorLayers < arquivoCopia.layers.length; contadorLayers++){
    
                        var layerAtual = arquivoCopia.layers[contadorLayers];
                        var nomeLayerAtual = layerAtual.name;
                        if(nomePoseAtual == nomeLayerAtual){    
                            
                            layerAtual.translate(posicaoX, posicaoY);
                            posicaoX += widthOriginal;
                            break;
                        }
                    }
                }
                posicaoY += heightOriginal;
            }
            arquivoCopia.resizeImage(UnitValue((arquivoCopia.width / tamanhoEscolhido) ,"px"), null, null, ResampleMethod.BICUBIC)
            application.activeDocument = doc;
        },

        dividirSpriteSheet(widthOriginal, heightOriginal, colunas, linhas){
            var doc = application.activeDocument;
            application.activeDocument = arquivoCopia;

            for(var contadorLinha = 0; contadorLinha < linhas; contadorLinha++){
                for(var contadorColuna = 0; contadorColuna < colunas; contadorColuna++){

                }
            }
        }
    }
};