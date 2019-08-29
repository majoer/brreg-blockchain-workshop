import React from "react";

export const Entity = ({entity, capTable}) => {

    const {antallAnsatte, forretningsadresse} = entity;
    const {postnummer, land} = forretningsadresse;

    return (
        <div>
            <div>Antall ansatte: {antallAnsatte}</div>
            <div>Postnummer: {postnummer}</div>
            <div>Land: {land}</div>
        </div>
    )
};
