#include "../utils/Printagem.jsx"

var LinhaDoTempo = function(){
    
     const printagem = new Printagem("LinhaDoTempo");
        
     //INNER FUNCTION NAO SEI SE VAI CHAMAR A PARTIR DESSE CONTEXTO   
    function getFrameCount() {  
        var count = 1;  
        while (goToFrame(count) != false) {  
            count++;  
        }  
        return count - 1;  
    }  

    //INNER FUNCTION IR PARA O FRAME ESCOLHIDO
    function goToFrame(frame) {  
        try {  
            var idslct = charIDToTypeID("slct");
            var desc = new ActionDescriptor();  
            var idnull = charIDToTypeID("null");
            var ref = new ActionReference();  
            var idanimationFrameClass = stringIDToTypeID( "animationFrameClass");
            ref.putIndex(idanimationFrameClass, frame);  
            desc.putReference(idnull, ref);  
            executeAction(idslct, desc, DialogModes.NO);  
            return true;  
        } catch (e) {
            printagem.printar("ERRO NO GOTOFRAME " + frame);
            printagem.printar(e);
        }  
        return false;  
    } 
      
    //INNER FUNCTION PARA DELETAR FRAME 
    function deleteFrame(){
        var desc1 = new ActionDescriptor();  
        var ref2 = new ActionReference();  
        ref2.putEnumerated( stringIDToTypeID( "animationFrameClass" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );  
        desc1.putReference( charIDToTypeID( "null" ), ref2 );  
        executeAction( charIDToTypeID( "Dlt " ), desc1, DialogModes.NO ); 
    }

    function adicionar1Frame(){
        var idDplc = charIDToTypeID( "Dplc" );
        var desc4 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref2.putEnumerated( idanimationFrameClass, idOrdn, idTrgt );
        desc4.putReference( idnull, ref2 );
        executeAction( idDplc, desc4, DialogModes.NO );		
    }
    
    function limparFramesExistente(){
         var totalFrames = getFrameCount();
         for(var i = 0; i < totalFrames; i++){
            goToFrame(i);
            try{
                deleteFrame ();
            }catch(e){
                printagem.printar("ERRO EM LIMPAR FRAMES EXISTENTES");
                printagem.printar(e);
            }
        } 
    }

    function criarObjetoLinhaDoTempo(tempoEscolhido){
        var idmakeFrameAnimation = stringIDToTypeID( "makeFrameAnimation" );
        executeAction( idmakeFrameAnimation, undefined, DialogModes.NO );
        
        var idsetd = charIDToTypeID( "setd" );
        var desc2 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref1 = new ActionReference();
        var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref1.putEnumerated( idanimationFrameClass, idOrdn, idTrgt );
        desc2.putReference( idnull, ref1 );
        var idT = charIDToTypeID( "T   " );
        var desc3 = new ActionDescriptor();
        var idanimationFrameDelay = stringIDToTypeID( "animationFrameDelay" );
        desc3.putDouble( idanimationFrameDelay, tempoEscolhido);
        // desc3.putDouble( idanimationFrameDelay, 0.100000);
        var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
        desc2.putObject( idT, idanimationFrameClass, desc3 );
        executeAction( idsetd, desc2, DialogModes.NO );
    }

    function criarFrames(app, qtdd){            
        for(var contador = 0; contador < qtdd - 1; contador++){                        
            adicionar1Frame();       
            // app.refresh();      
        }                            
    }

    function associarLayerComFrame(arrayDePoses){
        for(var contador = 0; contador < arrayDePoses.length; contador++){               
             goToFrame(contador + 1);
             //desligandoLayers();
             
             //DESLIGANDO LAYERS POSES
             for(var subContador = 0; subContador < arrayDePoses.length; subContador++){
                 arrayDePoses[subContador].desligar();
             }            
             
             arrayDePoses[contador].ligar();
        }
        goToFrame(1); 
    }

    return{    
        criarLinhaDoTempo : function(app, grupoAcaoEscolhido, tempoEscolhido){
            limparFramesExistente();
            // app.refresh();
            criarObjetoLinhaDoTempo(tempoEscolhido);

            grupoAcaoEscolhido.ligar();
            // app.refresh();

            criarFrames(app, grupoAcaoEscolhido.getQtddPoses());
            
            associarLayerComFrame(grupoAcaoEscolhido.arrayPoses);
            // app.refresh();
        }
    
    }
};