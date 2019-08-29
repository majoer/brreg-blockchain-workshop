import React, {Component} from 'react';
import {RegistryOfCapTablesQue} from "@brreg/sdk";

class Que extends Component {

    state = {
        error: false,
        que: []
    };

    async componentDidMount() {
        const {ethereum, web3} = window;

        if (ethereum && web3) {
            const capTableQue = await RegistryOfCapTablesQue.init(window.ethereum);
            const que = await capTableQue.que();

            this.setState({
                ...this.state,
                que
            });
        } else {
            this.setState({
                ...this.state,
                error: true,
            })
        }
    }

    render() {
        const {que, error} = this.state;

        if (error) {
            return <div>Error</div>
        }

        return (
            <div className="App">
                {
                    que.map((entry, i) => <div key={i}>{entry.name}</div>)
                }
            </div>
        );
    }
}

export default Que;
