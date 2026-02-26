import { useState } from 'react';
import OBJECTIFS from './data';
import type { Objectif } from './data';
import ProteinTable from './ProteinTable';

function App() {
    const [poidsMin, setPoidsMin] = useState('');
    const [poidsMax, setPoidsMax] = useState('');
    const [nbLignes, setNbLignes] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [erreur, setErreur] = useState('');

    // null tant qu'on n'a pas cliqué sur "Générer"
    const [resultat, setResultat] = useState<{
        poidsMin: number;
        poidsMax: number;
        nbLignes: number;
        objectifs: Objectif[];
    } | null>(null);

    function toggleObjectif(id: string) {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    function handleGenerer() {
        setErreur('');

        const min = Number(poidsMin);
        const max = Number(poidsMax);
        const lignes = Number(nbLignes);

        // validation des champs
        if (!poidsMin || !poidsMax || !nbLignes) {
            setErreur('Tous les champs sont obligatoires.');
            return;
        }
        if (min <= 0 || max <= 0) {
            setErreur('Le poids doit être positif.');
            return;
        }
        if (min >= max) {
            setErreur('Le poids min doit être < au poids max.');
            return;
        }
        if (lignes < 2 || !Number.isInteger(lignes)) {
            setErreur('Il faut au moins 2 lignes (entier).');
            return;
        }
        if (selectedIds.length === 0) {
            setErreur('Choisissez au moins un objectif.');
            return;
        }

        const objectifsChoisis = OBJECTIFS.filter(o => selectedIds.includes(o.id));

        setResultat({
            poidsMin: min,
            poidsMax: max,
            nbLignes: lignes,
            objectifs: objectifsChoisis,
        });
    }

    return (
        <>
            <h1>
                Générateur de <span>besoins en protéines</span>
            </h1>
            <p className="subtitle">
                Calculez vos besoins journaliers selon votre poids et vos objectifs
            </p>

            <div className="config-panel">
                <h2>Paramètres</h2>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="poidsMin">Poids minimum (kg)</label>
                        <input
                            id="poidsMin"
                            type="number"
                            min="1"
                            value={poidsMin}
                            onChange={e => setPoidsMin(e.target.value)}
                            placeholder="ex : 50"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="poidsMax">Poids maximum (kg)</label>
                        <input
                            id="poidsMax"
                            type="number"
                            min="1"
                            value={poidsMax}
                            onChange={e => setPoidsMax(e.target.value)}
                            placeholder="ex : 100"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="nbLignes">Nombre de lignes</label>
                        <input
                            id="nbLignes"
                            type="number"
                            min="2"
                            value={nbLignes}
                            onChange={e => setNbLignes(e.target.value)}
                            placeholder="ex : 6"
                        />
                    </div>
                </div>

                {/* Sélection des objectifs */}
                <div className="objectifs-group">
                    <p>Objectifs</p>
                    <div className="objectifs-list">
                        {OBJECTIFS.map(obj => {
                            const actif = selectedIds.includes(obj.id);
                            return (
                                <label
                                    key={obj.id}
                                    className={'objectif-chip' + (actif ? ' active' : '')}
                                >
                                    <input
                                        type="checkbox"
                                        checked={actif}
                                        onChange={() => toggleObjectif(obj.id)}
                                    />
                                    {obj.label}
                                </label>
                            );
                        })}
                    </div>
                </div>

                {erreur && <p className="error-msg">{erreur}</p>}

                <button
                    className="btn-generate"
                    onClick={handleGenerer}
                    disabled={selectedIds.length === 0}
                >
                    Générer le tableau
                </button>
            </div>

            {resultat && (
                <ProteinTable
                    poidsMin={resultat.poidsMin}
                    poidsMax={resultat.poidsMax}
                    nbLignes={resultat.nbLignes}
                    objectifs={resultat.objectifs}
                />
            )}
        </>
    );
}

export default App;
