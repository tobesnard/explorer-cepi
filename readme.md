# explorer-cepi

Une version en ligne est disponible [ici](http://109.21.6.9:38669)
( si le serveur ne répond pas, c'est probablement que mon ordinateur s'est éteint !! )

# Astuce
- le bouton vert à droite permet de régénérer l'arborescence des fichiers

# Technologies utilisées
- php
- javascript
- bootstrap
- jquery
- codeIgniter 4
- apache
- system debian

## Recommandations
- utiliser de préférence le navigateur chrome
- les petits écrans et écran tactile ne sont pas pris en charge

## Bug connus
- les événements clavier tendent à provoquer les erreurs 404
- la création d'un dossier sur un documents interrompt l'upload du fichier. Il faut se mettre sur un dossier pour fonctionner. Une exolution serait de placer le fichier dans le dossier parent de la position actuelle.
- sur la page de login, l'animation failli de temps en temps
- il manque une barre de progression lors d'un upload, cela donne un sensation de bug du système

## Enoncé de l'exercice :
L'idée est de réaliser un site qui permet de déposer des documents et de 
pouvoir ensuite les visualiser. Je vous propose afin de simplifier le 
développement de ne pouvoir déposer que des fichiers pdf

L'idéal serait d'avoir une arborescence des documents avec possibilité 
de créer des dossiers dans lesquels on mettra des fichiers

La partie identification (user/mot de passe) est optionnelle, vous le 
faîtes si vous le souhaitez

Pas la peine de prévoir non plus de back Office

Ce qui sera surtout regardé c'est la partie IHM du projet, la facilité 
de navigation et la clarté de l'interface

