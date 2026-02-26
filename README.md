# Mini-Projet – Générateur de besoins en protéines

Application React qui permet de calculer ses besoins journaliers en protéines en fonction de son poids et de ses objectifs sportifs.

## Fonctionnalités

- Sélection d'un ou plusieurs objectifs (Sédentaire, Endurance, Conservation musculaire, Prise de masse)
- Définition d'un poids minimum et maximum
- Choix du nombre de lignes à afficher
- Génération dynamique d'un tableau de résultats
- Validation des champs (poids positifs, min < max, etc.)
- Export du tableau en CSV
- Interface responsive

## Technologies

- React 19
- TypeScript
- Vite

## Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- npm

## Installation

```bash
cd mini-project
npm install
```

## Lancer le projet

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

## Build de production

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`.

## Structure du projet

```
src/
├── main.tsx            # Point d'entrée
├── App.tsx             # Composant principal (formulaire + logique)
├── ProteinTable.tsx    # Composant tableau + export CSV
├── data.ts             # Données des objectifs (coefficients)
└── index.css           # Styles
```
