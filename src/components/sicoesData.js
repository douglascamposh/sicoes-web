
import React from 'react';
import Title from './common/title';
import DescriptionContent from './common/description';

const SicoesData = ({ dataSicoes, sicoesDataFields }) => {
    return (
        <div>
            <h1 className="text-base font-bold mb-2"><Title>{"Datos Sicoes"}</Title></h1>
            <div className="grid grid-cols-2 gap-3">
                {sicoesDataFields.map(({ label, key }) => (
                    <div key={key}>
                        <Title className="text-sm">{label}</Title>
                        <DescriptionContent className="text-sm">{dataSicoes[key]}</DescriptionContent>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SicoesData;