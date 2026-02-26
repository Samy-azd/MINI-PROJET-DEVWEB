import type { Objectif } from './data';

type Props = {
    poidsMin: number;
    poidsMax: number;
    nbLignes: number;
    objectifs: Objectif[];
};

// Génère la liste des poids à afficher entre min et max
function genererPoids(min: number, max: number, n: number): number[] {
    const pas = (max - min) / (n - 1);
    const liste: number[] = [];
    for (let i = 0; i < n; i++) {
        liste.push(Math.round(min + pas * i));
    }
    return liste;
}

// Export CSV : construit le contenu et lance le téléchargement
function exporterCSV(poidsList: number[], objectifs: Objectif[]) {
    const sep = ';';
    const entetes = ['Poids (kg)', ...objectifs.map(o => o.label)];
    const lignes = poidsList.map(p => {
        const cellules = objectifs.map(o => {
            const bMin = Math.round(p * o.min);
            const bMax = Math.round(p * o.max);
            return `${bMin} - ${bMax} g/jour`;
        });
        return [p, ...cellules].join(sep);
    });

    const csv = [entetes.join(sep), ...lignes].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const lien = document.createElement('a');
    lien.href = url;
    lien.download = 'besoins_proteines.csv';
    lien.click();

    URL.revokeObjectURL(url);
}

export default function ProteinTable({ poidsMin, poidsMax, nbLignes, objectifs }: Props) {
    const poidsList = genererPoids(poidsMin, poidsMax, nbLignes);

    return (
        <div className="table-container">
            <h2>Résultats</h2>

            <table>
                <thead>
                    <tr>
                        <th>Poids (kg)</th>
                        {objectifs.map(obj => (
                            <th key={obj.id}>{obj.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {poidsList.map(poids => (
                        <tr key={poids}>
                            <td>{poids} kg</td>
                            {objectifs.map(obj => {
                                const bMin = Math.round(poids * obj.min);
                                const bMax = Math.round(poids * obj.max);
                                return (
                                    <td key={obj.id}>
                                        {bMin} – {bMax} g/jour
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="export-wrapper">
                <button
                    className="btn-export"
                    onClick={() => exporterCSV(poidsList, objectifs)}
                >
                    Exporter en CSV
                </button>
            </div>
        </div>
    );
}
