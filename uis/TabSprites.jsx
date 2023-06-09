﻿#include "../factory/FactoryMenuComponents.jsx"
#include "../factory/FactoryManagerLayers.jsx"

#include "../funcionalidades/ManipulacaoArquivo.jsx"
#include "../funcionalidades/SpriteSheet.jsx"

var TabSprites = function(){

    const factoryMenuComponents = new FactoryMenuComponents();  
    const managerLayers    = new FactoryManagerLayers();  
    const arrayTamanhos = [1, 2, 4, 8];
    const arrayOrdenado = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    var indiceGrupoEscolhido = 0;

    function criarTabSprite(app, doc, dlg, painel){
        var tabSprites = painel.add("tab", undefined, "Sprites");
        //Refatorar com tablinhadotempo
        var groupAcao = factoryMenuComponents.createGroup(tabSprites, "Grupo Acao:");   

        var layersOrganizados = managerLayers.organizarLayers(doc.layers);
        var dlgList = groupAcao.add("listbox", undefined, layersOrganizados.arrayNickNames);
        dlgList.onChange = function(){
            indiceGrupoEscolhido = dlgList.selection.index;        
        };   
        
        criarGrupoProcessamentoPorAcao(app, dlg, tabSprites);
        criarGrupoProcessamentoGeral(app, dlg, tabSprites);
        criarGrupoProcessamentoDivisaoSpriteSheet(app, dlg, tabSprites);
    }
    
    function criarGrupoProcessamentoPorAcao(app, dlg, tabSprites){
        var groupSpriteSheetPorAcao = factoryMenuComponents.createGroup(tabSprites, "SpriteSheet por acao:");   
        groupSpriteSheetPorAcao.add("statictext", undefined, "Tam:");
        var dropDown = groupSpriteSheetPorAcao.add("dropdownlist", undefined, arrayTamanhos);
        
        dropDown.selection = 0;
        var btnSpritesheet = groupSpriteSheetPorAcao.add("button", undefined, "Processar");
        btnSpritesheet.onClick = function(){
            var grupoEscolhido = managerLayers.getGrupoAcaoEscolhido(indiceGrupoEscolhido);        
    
            var manipulacaoArquivo = new ManipulacaoArquivo(app);         
            var arquivoCopia = manipulacaoArquivo.criarCopiaComLayers(grupoEscolhido.originalName);  
            var tamanhoOriginal = arquivoCopia.width;

            manipulacaoArquivo.aumentarCanvas(arquivoCopia, grupoEscolhido.getQtddPoses(), 1);            
    
            var spriteSheet = new SpriteSheet(app, arquivoCopia);
            var tamanhoEscolhido = arrayTamanhos[dropDown.selection.index];
            spriteSheet.criarSpriteSheet(tamanhoOriginal, tamanhoEscolhido);        
            dlg.close();
        };    
    }

    function criarGrupoProcessamentoGeral(app, dlg, tabSprites){
        var groupSpriteSheetGeral = factoryMenuComponents.createGroup(tabSprites, "SpriteSheet geral:");   
        groupSpriteSheetGeral.add("statictext", undefined, "Tam:");         
        var dropDown = groupSpriteSheetGeral.add("dropdownlist", undefined, arrayTamanhos);
        var btnSpritesheet = groupSpriteSheetGeral.add("button", undefined, "Processar");

        dropDown.selection = 0;
        btnSpritesheet.onClick = function(){
            var grupo = managerLayers.getGrupoAcaoEscolhido(0); 
                
            var manipulacaoArquivo = new ManipulacaoArquivo(app);    
            var arquivoCopia = manipulacaoArquivo.criarCopiaComTodosOsLayers();
            
            var larguraOriginal = arquivoCopia.width;
            var halturaOriginal = arquivoCopia.height;
            
            manipulacaoArquivo.aumentarCanvas(arquivoCopia, grupo.getQtddPoses(), managerLayers.getQtddGrupos());

            var spriteSheet = new SpriteSheet(app, arquivoCopia);
            var tamanhoEscolhido = arrayTamanhos[dropDown.selection.index]
            spriteSheet.criarSpriteSheetGeral(larguraOriginal, halturaOriginal, managerLayers.getArrayDeGrupoAcoes(), tamanhoEscolhido);

            dlg.close();
        };    
    }

    function criarGrupoProcessamentoDivisaoSpriteSheet(app, dlg, tabSprites){
        var groupSpriteSheetDivisao = factoryMenuComponents.createGroup(tabSprites, "Dividir SpriteSheet")
        groupSpriteSheetDivisao.add("statictext", undefined, "L:");
        var dropDownLinhas = groupSpriteSheetDivisao.add("dropdownlist", undefined, arrayTamanhos);
        groupSpriteSheetDivisao.add("statictext", undefined, "C:");
        var dropDownColunas = groupSpriteSheetDivisao.add("dropdownlist", undefined, arrayTamanhos);
        var btnSpritesheet = groupSpriteSheetDivisao.add("button", undefined, "Processar");

        dropDownLinhas.selection  = 0;
        dropDownColunas.selection = 0;

        btnSpritesheet.onClick = function(){
            var grupo = managerLayers.getGrupoAcaoEscolhido(0); 
            
            var manipulacaoArquivo = new ManipulacaoArquivo(app);            
            var arquivoCopia = manipulacaoArquivo.criarCopiaComTodosOsLayers();

            var larguraOriginal = arquivoCopia.width;
            var halturaOriginal = arquivoCopia.height;

            var qtdLinhas = arrayTamanhos[dropDownLinhas.selection.index];
            var qtdColunas = arrayTamanhos[dropDownColunas.selection.index];
            manipulacaoArquivo.aumentarCanvas(arquivoCopia, 1, qtdLinhas); 

            var spriteSheet = new SpriteSheet(app, arquivoCopia);
            spriteSheet.dividirSpriteSheet(larguraOriginal, halturaOriginal, qtdColunas, qtdLinhas);
            dlg.close();
        };
    }

    return{
        criarTab : function(app, doc, dlg, painel){
            criarTabSprite(app, doc, dlg, painel);
        }
    }
};