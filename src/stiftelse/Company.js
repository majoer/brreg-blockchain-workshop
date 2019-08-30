import React, {Component} from 'react';
import {StockFactory} from "@brreg/sdk";

class Company extends Component {

  async componentDidMount() {
    const {ethereum} = window;
    const stockFactory = await StockFactory.init(ethereum);
    const {enhet} = this.props.location.state;

    const Company = await stockFactory.createNew(enhet.selskapsnavn, enhet.organisasjonsnummer);
    const address = await Company.getAddress();

    this.props.history.push('/stiftelse/entity', {address, enhet});
  }


  render() {
    return (
      <div>Setter inn company i blockchain</div>
    )
  }
}

export default Company;
