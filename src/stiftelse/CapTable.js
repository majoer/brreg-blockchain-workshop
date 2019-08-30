import React, {Component} from 'react';
import {RegistryOfCapTables} from "@brreg/sdk";
import {Redirect} from 'react-router-dom';

class CapTable extends Component {

  state = {
    done: false
  };

  async componentDidMount() {

    const {ethereum} = window;
    const capTables = await RegistryOfCapTables.init(ethereum);
    const {address} = this.props.location.state;

    const capTableTx = await capTables.add(address);
    await capTableTx.wait();

    this.setState({
      ...this.state,
      done: true
    });
  }

  render() {

    if (this.state.done) {
      return <Redirect to="/stiftelse/complete"/>
    }

    return (
      <div>Setter inn Aksjeeierbok i blockchain</div>
    )
  }
}

export default CapTable;
