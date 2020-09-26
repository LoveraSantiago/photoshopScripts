#target photoshop

#include "utils/Printagem.jsx"
#include "utils/StringPrototypes.jsx"

#include "uis/TabBones.jsx"
#include "uis/TabLinhaDoTempo.jsx"
#include "uis/TabSprites.jsx"

(function(){
    const doc = app.activeDocument;
    const printagem        = new Printagem("Main");    
    
    var dlg = new Window('dialog',"Main", undefined, {closeButton:true});
    dlg.alignChildren = "left";    
    var tpanel = dlg.add("tabbedpanel");
    tpanel.preferredSize.width=280;    
    
    var tabSprites = new TabSprites();
    tabSprites.criarTab(app, doc, dlg, tpanel);
    
    var tabLinhaDoTempo = new TabLinhaDoTempo();
    tabLinhaDoTempo.criarTab(doc, dlg, tpanel);
    
    var tabBones = new TabBones();
    tabBones.criarTab(app, doc, dlg, tpanel);
    
    //INICIANDO O DIALOGO NO PAINEL 0
    tpanel.selection = 0;
    dlg.show();    

    printagem.printar("fim");
})();