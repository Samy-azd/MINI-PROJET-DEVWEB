// Types et données pour les objectifs de protéines

export type Objectif = {
    id: string;
    label: string;
    min: number;
    max: number;
};

// Coefficients en g/kg/jour selon l'objectif
const OBJECTIFS: Objectif[] = [
    { id: 'sedentaire', label: 'Sédentaire', min: 0.8, max: 1.0 },
    { id: 'endurance', label: 'Endurance', min: 1.2, max: 1.6 },
    { id: 'conservation', label: 'Conservation musculaire', min: 1.6, max: 1.8 },
    { id: 'prise-masse', label: 'Prise de masse', min: 1.8, max: 2.2 },
];

export default OBJECTIFS;
