# Ma Petite Coloc

Mon projet est une application Backend qui permet de gérer sa colocation (gestion des membres, gestion des utilisateurs...). Elle est développée en TypeScript (avec Node.js) et utilise une base de données MongoDB. Elle a été réalisé sur 2 jours, pendant un cours de Node.js à Sup de Vinci - Bordeaux. 

## Table des Matières
1. [Fonctionnalités](#fonctionnalités)
2. [Installation](#installation)
3. [Utilisation](#utilisation)
4. [Structure du Projet](#structure-du-projet)
5. [Technologies](#technologies)
6. [Auteurs](#auteurs)


## Fonctionnalités

- **Authentification** : Inscription utilisateur, connexion sécurisée, persistance de la connexion, informations de l'utilisateur, suppression d'un utilisateur.
- **Gestion d'une colocation** : Listing des colocations d'un utilisateur, créer une colocation, informations d'une colocation, supprimer (désactiver) une colocation.

Les fonctionnalités suivantes ne sont pas encore implémentées :
- **Gestion des colocataires** : Ajouter/supprimer des membres, transferer la colocation, voir le profil d'un membre de sa colocation.
- **Gestion des finances** : Ajouter des charges, répartition automatique des charges, payer/rembourser un membre, historique des paiements.
  

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Titinite/Ma-Petite-Coloc.git
   ```
2. Modifiez les informations de connexion à la base de données dans `mongoose.config.ts` pour qu’elles correspondent à votre configuration locale.
3. Lancez un l'application :
   ```bash
   npm run dev
   ```


## Utilisation

Pour utiliser l'application, vous aurez aussi besoin de Postman : il fait guise de front pour utiliser les différentes fonctionnalités.


## Structure du Projet

- **config/databases** : Fichiers de configuration de l'accès à la base de données 
- **types** : Fichiers de typage de l'application (DTOS, Inputs, Presenters)
- **databases/mongodb** : Fichiers des models
- **repositories** : Fichiers des repositories
- **services** : Fichiers des services (logique métier)
- **controllers** : Fichiers des controllers (qui appellent des services)
- **routes** : Fichiers des routes pour les différentes requêtes
- **middlewares** : Fichiers permettant de sécuriser les routes (permettre à certains ID de faire une manipulation par exemple)
- **server.ts** et **app.ts** : Fichiers racines du projet


## Technologies

- **Node.js** : Base du projet
- **TypeScript** : Langage utilisé pour toute l'application Backend
- **MongoDB (NoSQL)** : Base de données


## Auteurs
Développé par Titinite (Thibault LERAY) en période de cours. Retrouvez plus de détails dans le dépôt [GitHub](https://github.com/Titinite/Ma-Petite-Coloc).
