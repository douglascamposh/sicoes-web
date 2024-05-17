
import React from 'react';

const SicoesData = ({ dataSicoes, sicoesDataFields }) => {
    return (
        <div>
            <h1 className="text-base font-bold mb-2">Datos Sicoes</h1>
            <div className="grid grid-cols-2 gap-3">
                {sicoesDataFields.map(({ label, key }) => (
                    <div key={key}>
                        <p className="font-medium text-sm">{label}:</p>
                        <p className="text-sm">{dataSicoes[key]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SicoesData;