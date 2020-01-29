# test-justify-text

## Introduction

C'est une application qui expose des endpoints permettant à un utilisateur de créer un compte et de s'authentifier pour consulter un endpoint /api/justify pour justifier un texte donné.

## Run

1. Clone

2. `npm install` pour installer les dépendances.

3. `npm run test` pour exécuter les tests.

4. `npm start` pour lancer l'application.

## Principe

- Il faut tout d'abord créer un compte `/api/register` avec une requête http POST contenant un body de la forme `{"email": foo@bar.com}`.

- L'endpoint `/api/token` permet à un utilisateur de s'authentifier et retourne un token qui expire dans 24h. C'est une requête Http POST avec un body de la forme `{"email": "foo@bar.com"}`.

- Pour faire la justification du texte, l'endpoint `/api/justify` permet de récupérer un texte avec une requête Http POST contenant le texte avec un `ContentType: text/plain`. L'endpoint retourne une réponse Http avec un texte justifié.

- Le champ `limit` dans `User Model` permet de vérifier si un utilisateur a atteint sa limite (80 000 mots par jour). Si c'est le cas, alors une reponse Http avec un status code 402 sera retournée.

## Les outils utilisés

Pour ce faire j'ai utilisé:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) : C'est un service Cloud permettant de créer une base de données MongoDB sur le cloud.

- [Mongoose](https://mongoosejs.com/): C'est un object Modeling pour node.js permettant l'interaction avec une base de données MongoDB.

- [Express.js](https://expressjs.com/fr/): C'est un framework JavaScript permettant le routage de l'application et la création des endpoints.

- [JsonwebToken](https://www.npmjs.com/package/jsonwebtoken): C'est module JavaScript permettant la création des token.

## Author

- Ghassen BEN OTHMEN
