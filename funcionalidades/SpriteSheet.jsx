var SpriteSheet = function(app){

    var application = app;
    
    return {
        criarSpriteSheet : function(widthOriginal, arquivoCopia, tamanhoEscolhido){
            var doc = application.activeDocument;

            application.activeDocument = arquivoCopia;
            var posicaoX = 0;
            for(var contador = arquivoCopia.layers.length -1; contador >=0; contador--){
                 arquivoCopia.layers[contador].translate(posicaoX, 0);                    
                 posicaoX += widthOriginal;
            }
            arquivoCopia.resizeImage(UnitValue((arquivoCopia.width / tamanhoEscolhido) ,"px"), null, null, ResampleMethod.BICUBIC)

            application.activeDocument = doc;
        }       
    }
};