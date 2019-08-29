import React from "react";

export const Entity = ({entity, capTable}) => {

  const {antallAnsatte, forretningsadresse, navn} = entity;
  const {postnummer, land} = forretningsadresse;

  return (
    <div>
      <div><i>Data fra enhetsregisteret:</i></div>
      <br/>
      <div>Navn: {navn}</div>
      <div>Antall ansatte: {antallAnsatte}</div>
      <div>Postnummer: {postnummer}</div>
      <div>Land: {land}</div>
    </div>
  )
};
