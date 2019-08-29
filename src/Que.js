import React, {Component} from 'react';
import {EntityRegistry, RegistryOfCapTablesQue} from "@brreg/sdk";
import './Que.css';

const getEntity = async (orgnummer) => {
    return fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnummer}`)
        .then(response => response.json())
        .catch((e) => {
            console.error(e);
            return Promise.resolve(null);
        });
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
        const {que, error, entities} = this.state;

        if (error) {
            return <div>Error</div>
        }

        return (
            <div className="App">
                {
                    que.map((entry, i) => (
                        <div class="que">
                            <pre key={`que-${i}`}>{JSON.stringify(entry, null, 4)}</pre>
                            <pre key={`enhet-${i}`}>{JSON.stringify(entities[i])}</pre>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Que;
