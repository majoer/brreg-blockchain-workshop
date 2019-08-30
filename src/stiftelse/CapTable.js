import React, {Component} from 'react';

class CapTable extends Component {

	async componentDidMount() {
		const {address, capTables} = this.props;

	    const capTableTx = await capTables.add(address);
	    await capTableTx;


      	this.props.history.push('/stiftelse/complete');
	}

  render() {
    return (
      <div>Cap table</div>
    )
  }
}

export default CapTable;
