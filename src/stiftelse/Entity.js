import React, {Component} from 'react';
import {EntityRegistry, RegistryOfCapTables, RegistryOfCapTablesQue, StockFactory} from "@brreg/sdk";

class Entity extends Component {

  async componentDidMount() {
    const {ethereum} = window;
    const entityRegistry = await EntityRegistry.init(ethereum);
    const {enhet, address} = this.props.location.state;

    const entityTx = await entityRegistry.addEntity({
      address,
      uuid: enhet.organisasjonsnummer,
      type: 'organization',
      name: enhet.selskapsnavn,
      country: enhet.land,
      city: enhet.by,
      postalcode: enhet.postkode,
      streetAddress: enhet.adresse
    });

    await entityTx;

    this.props.history.push('/stiftelse/capTable', {address});
  }


  render() {
    return (
      <div>Setter inn enhet i blockchain</div>
    )
  }
}

export default Entity;
