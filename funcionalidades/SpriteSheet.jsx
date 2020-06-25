var SpriteSheet = function(){
    
    return {
        criarSpriteSheet : function(widthOriginal, arquivoCopia){
            var posicaoX = 0;
            for(var contador = arquivoCopia.layers.length -1; contador >=0; contador--){
                 arquivoCopia.layers[contador].translate(posicaoX, 0);                    
                 posicaoX += widthOriginal;
            }
        }
    }
};