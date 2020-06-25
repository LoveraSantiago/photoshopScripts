#include "FactoryGrupoBones.jsx"
#include "../utils/Printagem.jsx"

var FactoryBoneManager = function(){
    const factoryGrupoBones = new FactoryGrupoBones();       
    const printagem = new Printagem("FactoryBoneManager.jsx");
        
    function max(a,  b){
        if(a > b){
            return a;
        }
        return b;
    }

    function getIndiceMaximoDosLayers(layers){
        var maior = 0;
            for(var contador = 0; contador < layers.length; contador++){
                var split = layers[contador].name.split(":");                
                var indice = parseInt(split[0]);                
                maior = max(maior, indice);                               
            }
        return maior;
    }

    function criarArrayDeGrupoBones(qtd){
        var arrayResult = [];
        for(var contador = 0; contador < qtd; contador++){
            arrayResult.push(factoryGrupoBones.criarGrupoBone(contador + 1));
        }
        return arrayResult;
    }

    function distribuirLayers(layers, arrayDeBones){
         for(var contador = 0; contador < layers.length; contador++){
                var split = layers[contador].name.split(":");
                var indiceAtual = parseInt(split[0]) - 1;
                var grupoBoneAtual = arrayDeBones[indiceAtual];
                grupoBoneAtual.receberLayer(layers[contador]);
          }
    }   
    
    return {
        processarLayers : function(app, docOriginal, docCopia){
            var layers = docCopia.layers;
            var indiceMaior = getIndiceMaximoDosLayers(layers);
            var grupoBones = criarArrayDeGrupoBones(indiceMaior);
            
            distribuirLayers(layers, grupoBones);
            for(var contador = 0; contador < grupoBones.length; contador++){
                //printagem.printar("Inicializando o grupoBones: " + (contador + 1));
                grupoBones[contador].inicializar();
            }
        
            app.activeDocument = docCopia;
            for(var contador = 0; contador < grupoBones.length; contador++){
                grupoBones[contador].mergirLayers(docCopia);
            }
            
        }
    
    }
};