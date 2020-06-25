var Printagem = function(nomeClasse){
    var classe = nomeClasse;
    
    return{
            printar : function(obj){
                $.writeln("class: " + nomeClasse + " msg: " + obj);
            }          
     } 
};