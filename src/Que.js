import React, {Component} from 'react';
import {RegistryOfCapTablesQue} from "@brreg/sdk";
import './Que.css';
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Entity} from "./Entity";

const getEntity = async (orgnummer) => {
    return fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnummer}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Entity not found');
            }

            return response;
        })
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
            <div>
                <h1>Kø for Aksjeeierbøker</h1>

                <div className="que">
                    {
                        que.map((capTable, i) => {
                            const entity = entities[i];
                            const navn = entity ? entity.navn : 'Ukjent enhet';

                            console.log(capTable);

                            return (
                                <div key={i} className="que__entry">
                                    <Card>
                                        <CardHeader title={navn}></CardHeader>
                                        <CardContent>
                                            {
                                                entity
                                                    ? (
                                                        <Entity entity={entity} capTable={capTable}/>
                                                    )
                                                    : ('')
                                            }
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" color="secondary">Avslå</Button>
                                            <Button variant="contained" color="primary">Godkjenn</Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Que;
