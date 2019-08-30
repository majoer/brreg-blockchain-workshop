import React, {Component} from 'react';

class CapTable extends Component {

	async componentDidMount() {
		console.log("6 - There is no cow level");
		const {address, capTables} = this.props.location.state;

	    const capTableTx = await capTables.add(address);
	    await capTableTx;

	    console.log('7 - Power overwhelming')
      	this.props.history.push('/stiftelse/complete');
	}

  render() {
    return (
      <div>Cap table</div>
    )
  }
}

export default CapTable;
