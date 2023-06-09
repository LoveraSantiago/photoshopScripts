var Tamanho = function(alturaArg, larguraArg){

    var altura = alturaArg;
    var largura = larguraArg;

    return{
        getAltura : function(){
            return altura;
        },
        getLargura : function(){
            return largura;
        }
    }
};