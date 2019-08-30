import React, {Component} from 'react';
import {StockFactory} from "@brreg/sdk";
import {Redirect} from "react-router-dom";

class Company extends Component {

  state = {
    enhet: undefined,
    address: undefined,
    done: false
  }

  async componentDidMount() {
    const {ethereum} = window;
    const stockFactory = await StockFactory.init(ethereum);
    const {enhet} = this.props.location.state;
    const Company = await stockFactory.createNew(enhet.selskapsnavn, enhet.organisasjonsnummer);

    const address = await Company.getAddress();

    this.setState({
      enhet,
      address,
      done: true
    })
  }


  render() {

    const {done, enhet, address} = this.state;
    const state = {
      enhet,
      address
    }

    if (done) {
      return <Redirect to={{pathname: "/stiftelse/entity", state}}/>
    }

    return (
      <div>Setter inn company i blockchain</div>
    )
  }
}

export default Company;
