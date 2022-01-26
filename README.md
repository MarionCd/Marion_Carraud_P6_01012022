Projet Piiquante : construction d'une API sécurisée

Les dépendances requises pour ce projet sont :

- NodeJS 12.14 or 14.0.
- Angular CLI 7.0.2.
- node-sass : utiliser la version correspondante à votre version NodeJS.

Sur windows, ces installations requièrent l'usilisation de l'invit de commande en mode administrateur.

Ensuite cloner ce repo :

`run npm install`
`run npm install --save-dev run-script-os`

Exécuter `npm start`

Ceci devrait lancer un serveur local et s'ouvrir sur votre navigateur par défaut.

Si votre navigateur ne se lance pas, ou provoque une erreur 404, se rendre sur : 
http://localhost:8080.

L'application devrait se recharger automatiquement lorsqu'un fichier est changé.

Faire `Ctrl+C` dans le terminal pour arrêter le serveur local.

Côté back, ouvrir un logiciel d'édition de code et ouvrir le terminal.

Aller dans le fichier backend.

Exécuter :

`npm install nodemon`
`nodemon server`

Vérifier son bon fonctionnement via postman ou via votre navigateur : http://localhost:3000 