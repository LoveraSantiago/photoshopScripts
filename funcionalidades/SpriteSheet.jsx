var SpriteSheet = function(app, arqCopia, originalTamanho){

    var application = app;
    var arquivoCopia = arqCopia;
    var tamanhoOriginal = originalTamanho;
    
    return {
        criarSpriteSheet : function(tamanhoEscolhido){
            var doc = application.activeDocument;

            application.activeDocument = arquivoCopia;
            var posicaoX = 0;
            for(var contador = arquivoCopia.layers.length -1; contador >=0; contador--){
                 arquivoCopia.layers[contador].translate(posicaoX, 0);                                     
                 posicaoX += tamanhoOriginal.getLargura();
            }
            arquivoCopia.resizeImage(UnitValue((arquivoCopia.width / tamanhoEscolhido) ,"px"), null, null, ResampleMethod.BICUBIC)

            application.activeDocument = doc;
        },
        
        criarSpriteSheetGeral : function(arrayGrupoAcao, tamanhoEscolhido){
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
                            posicaoX += tamanhoOriginal.getLargura();
                            break;
                        }
                    }
                }
                posicaoY += tamanhoOriginal.getAltura();
            }
            arquivoCopia.resizeImage(UnitValue((arquivoCopia.width / tamanhoEscolhido) ,"px"), null, null, ResampleMethod.BICUBIC)
            application.activeDocument = doc;
        },

        dividirSpriteSheet: function(colunas, linhas){
            var doc = application.activeDocument;
            application.activeDocument = arquivoCopia;

            var larguraColuna = tamanhoOriginal.getLargura() / arquivoCopia.layers.length;
            var posicaoY = 0;
            var contadorDeLayers = 0;            
            
            for(var contadorLinha = 0; contadorLinha < linhas; contadorLinha++){

                var posicaoX = 0;
                for(var contadorColuna = 0; contadorColuna < colunas; contadorColuna++){

                    var layerAtual = arquivoCopia.layers[contadorDeLayers];
                    if(layerAtual != null){
                        layerAtual.translate(posicaoX, posicaoY);
                    }

                    contadorDeLayers++;                   
                    posicaoX += larguraColuna;
                }
                posicaoY += tamanhoOriginal.getAltura();
            }
            application.activeDocument = doc;
        }
    }
};