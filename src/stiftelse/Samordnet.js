import React, {Component} from 'react';
import pad from 'pad';

class Samordnet extends Component {

	samordnetRegistermelding(stiftelsesDokument) {

    return new Promise((resolve) => {
      setTimeout(() => {
        const organisasjonsnummer = pad(9, Math.round(Math.random() * 999999999), '0');

        resolve({
          ...stiftelsesDokument,
          organisasjonsnummer
        });
      }, 5000);
    })
  }

	async componentDidMount() {

      const {stiftelsesDokument, stockFactory, entityRegistry, capTables} 
        = this.props.locattion.state;

    	const enhet = await this.samordnetRegistermelding(stiftelsesDokument);
    	//this.props.setEnhetState(enhet);

      this.props.history.push({
        pathname: '/stiftelse/entity', 
        state:{
          enhet, 
          stockFactory, 
          entityRegistry, 
          capTables}
        });
	}

  render() {
    return (
      <div>Oppretter enhet via. samordnet registermelding</div>
    )
  }
}

export default Samordnet;
