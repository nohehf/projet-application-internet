# Projet-application-internet

Ce projet est un projet étudiant visant à mettre en pratique les compétences apprises en application internet. 

## Description

Le projet consiste à créer un wiki. Les pages du wiki seront accessible soit dans le menu prévu, soit à l'adresse url : 'http://localhost:5173/exemplepage'.
Le contenu de la page est en markdown. Lors de la visualisation le contenu est affiché sous forme traitée. Lors de l'édition ou la modification, le contenu apparaît sous sa forme source. 
Lors de l'ouverture d'une page '/exemplepage', si celle ci n'existe pas, l'utilisateur aura la possibilité de la créer et d'en éditer son contenu.

## Back-end 

Le back end de l'application a été crée en utilisant NestJS. Le framework ressemble beaucoup à FeathersJS (vu en cours). Il met en place un API REST des différentes pages du wiki, ressources au sens REST.  
Pour plus d'information voici la documentation de NEST, que l'on vous invite vivement à consulter: https://nestjs.com/

## Front-end 

Réalisé : 
- Vite pour Bootstraper, packager et le dev-server  
- Utilisation de VueJS 3 pour développer le front-end et mettre en oeuvre les modes création, édition et visualisation.  
- L'application est responsive (elle s'adapte à la largeur de l'écran). 
- L'impression de la page fait apparaitre le contenu markdown traité et non brut(raw).
- L'application utilise des web-sockets, ce qui permet aux modifications effectué de se mettre à jour en temps réel sur les autres pages ouvertes. Cela permet aussi de voir le nombre de clients connectés en temps réel, ainsi que de mettre à jour la liste des articles disponibles sur la homepage.

Non réalisé : 
- (Optionnel) Déploiement en production sur un cloud, VPS ou un environnement gratuit.

## Démonstration 

Lien Youtube : *

## Requirements
-NodeJS 18 or higher  

-Yarn 1.22.x or higher 

## Yarn
When Node is installed, you might need to run « corepack enable » to enable yarn, then restart your terminal and it should be fine

## Procédure backend
```	
yarn #install dependencies
yarn start:dev #start dev server
```
## Procédure frontend
```
yarn #install dependencies
yarn dev #start dev server
``` 
