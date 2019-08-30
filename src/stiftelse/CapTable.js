import React, {Component} from 'react';
import {RegistryOfCapTables} from "@brreg/sdk";

class CapTable extends Component {

  async componentDidMount() {

    const {ethereum} = window;
    const capTables = await RegistryOfCapTables.init(ethereum);
    const {address} = this.props.location.state;

    const capTableTx = await capTables.add(address);
    await capTableTx.wait();

    this.props.history.push('/stiftelse/complete');
  }

  render() {
    return (
      <div>Setter inn Aksjeeierbok i blockchain</div>
    )
  }
}

export default CapTable;
