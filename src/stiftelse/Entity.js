import React, {Component} from 'react';
import {EntityRegistry, RegistryOfCapTables, RegistryOfCapTablesQue, StockFactory} from "@brreg/sdk";
import {Redirect} from "react-router-dom";

class Entity extends Component {

  state = {
    done: false,
    address: undefined
  };

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

    await entityTx.wait();

    this.setState({
      ...this.state,
      address,
      done: true
    });
  }


  render() {
    const {done, address} = this.state;
    const state = {
      address
    };

    if (done) {
      return <Redirect to={{pathname: "/stiftelse/capTable", state}}/>
    }

    return (
      <div>Setter inn enhet i blockchain</div>
    )
  }
}

export default Entity;
