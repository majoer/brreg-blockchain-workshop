import React, {Component} from 'react';
import request from 'request-promise';
import {EntityRegistry, RegistryOfCapTablesQue} from "@brreg/sdk";

const getEntity = async (orgnummer) => {
   return request(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnummer}`)
       .catch(() => Promise.resolve(null));
};

class Que extends Component {

    state = {
        error: false,
        que: [],
        entities: []
    };

    async componentDidMount() {
        const {ethereum, web3} = window;

        if (ethereum && web3) {
            const capTableQue = await RegistryOfCapTablesQue.init(ethereum);
            const que = await capTableQue.que();
            const entityPromises = que.map(q => {
                return getEntity(q.uuid);
            });

            const entities = await Promise.all(entityPromises);

            this.setState({
                ...this.state,
                que,
                entities
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
                    que.map((entry, i) => <pre key={i}>{JSON.stringify(entry, null, 4)}</pre>)
                }
            </div>
        );
    }
}

export default Que;
