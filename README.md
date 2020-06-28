# Photoshop Scripts

## Aba Bones
Para trabalhar com imagens que serão utilizadas em Bones. Geralmente com uso de grande numero de layers.

<img src="https://raw.githubusercontent.com/LoveraSantiago/photoshopScripts/develop/imgs/dialog1.png?sanitize=true&raw=true" style="border: 1px solid #000;">

1. Botão para diminuir escala do desenho. 
    - No input text é colocado o valor pela qual se quer dividir o tamanho do desenho.  
      Ex: 5 (vai diminuir o desenho pelo seu 1/5)
    - As camadas devem estar organizadas no padrão "Numero Grupo: Nome do Grupo: Ordem dentro do grupo".  
      Ex: "1:PeFrente:1", "1:PeFrente:2", "2:PernaFrente:1", "2:PernaFrente:2".  
      O resultado fara com que a imagem resultante faça o merge em 2 camadas "1:PeFrente" e "2:PernaFrente".  
      *A imagem A abaixo tem um exemplo do nome de camadas.*

2. Botão para tornar visivel todas as camadas.

###### Imagem A referencia a camadas de bones
<img src="https://raw.githubusercontent.com/LoveraSantiago/photoshopScripts/develop/imgs/excamadabones.png?sanitize=true&raw=true" style="border: 1px solid #000;">
___

## Aba Sprites
Para trabalhar com imagens que serão utilizadas em Bones. Geralmente com uso de grande numero de layers.

<img src="https://raw.githubusercontent.com/LoveraSantiago/photoshopScripts/develop/imgs/dialog2.png?sanitize=true&raw=true" style="border: 1px solid #000;">

1. Caixa de seleção montada à partir da principais camadas/pastas.
    - As camadas principais devem ser pastas no formato ACAO:Numero Identificador da Acao: Nome do grupo Acao.  
      Ex: "ACAO:1:FOGO"  
    - As camadas dentro das pastas deve ter a nomenclatura POSE:Numero da ordem.  
      EX: "POSE:1", "POSE:2", "POSE:3" ...  
      *A imagem B abaixo tem um exemplo do nome de camadas.*

2. Monta uma linha do tempo a partir do grupo Acao Selecionado.  
 *A imagem C abaixo mostra a linha do tempo montada.*  
 **A linha do tempo deve estar habilitada na aba Janela>Linha do Tempo**


###### Imagem B referencia a camadas de sprites
<img src="https://raw.githubusercontent.com/LoveraSantiago/photoshopScripts/develop/imgs/excamadassprites.png?sanitize=true&raw=true" style="border: 1px solid #000;">

###### Imagem C exemplo de linha do tempo montada
<img src="https://raw.githubusercontent.com/LoveraSantiago/photoshopScripts/develop/imgs/exlinhadetempo.png?sanitize=true&raw=true" style="border: 1px solid #000;">