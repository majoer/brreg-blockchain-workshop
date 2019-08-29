import React, {Component} from 'react';
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Entity} from "./Entity";
import './Que.css';

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
    que: [],
    entities: []
  };

  async componentDidMount() {
    const {capTableQue} = this.props;

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
  }

  onClickAvslaa(capTable) {
    const {address} = capTable;
    this.props.capTableQue.process(address, false, 'Nei');
  }

  onClickGodkjenn(capTable) {
    const {address} = capTable;
    this.props.capTableQue.process(address, true, 'Hurrah!');
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

              return (
                <div key={i} className="que__entry">
                  <Card>
                    <CardHeader title={capTable.name}></CardHeader>
                    <CardContent>
                      {
                        entity
                          ? (
                            <Entity entity={entity} capTable={capTable}/>
                          )
                          : ('Kunne ikke finne enhet i enhetsregisteret')
                      }
                    </CardContent>
                    <CardActions>

                      <Button variant="contained" color="secondary" onClick={() => this.onClickAvslaa(capTable)}>
                        Avslå
                      </Button>

                      <Button variant="contained" color="primary"
                              onClick={() => this.onClickGodkjenn(capTable)}>
                        Godkjenn
                      </Button>

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
