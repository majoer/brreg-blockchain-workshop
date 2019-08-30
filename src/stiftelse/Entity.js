import React, {Component} from 'react';

class Entity extends Component {

	async componentDidMount() {
		const {enhet, stockFactory, entityRegistry, setAddressState} = this.props;

		console.log('1 - Starbase, where no turtle has gone before...');
		console.log(enhet);

		const Company = await stockFactory.createNew(enhet.selskapsnavn, enhet.organisasjonsnummer);
		console.log('2 - Sewer surfin!');
	    const address = await Company.getAddress();
	    console.log('3 - Technodrome, the final shellshock!');
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

	    console.log('4 - Prehistoric Turtlesaurus')

    	await entityTx;

    	console.log('5 - Neon nightriders')
	    setAddressState(address);
	    
      	this.props.history.push('/stiftelse/capTable');
	}


  render() {
    return (
      <div>Setter inn enhet i blockchain</div>
    )
  }
}

export default Entity;
