import React, {Component} from "react";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export class Stiftelse extends Component {

  state = {
    selskapsnavn: '',

    navn: '',
    adresse: '',
    postkode: '',
    by: '',
    land: '',

    aksjekapital: '',
    paalydende: '',
    antallAksjer: '',
  };

  async onClickSendInn() {
    const {selskapsnavn} = this.state;

    if (!selskapsnavn) {
      return;
    }

    this.props.history.push('/stiftelse/samordnet', {
      stiftelsesDokument: this.state
    });
  }

  onChange(e, field) {
    this.setState({
      ...this.state,
      [field]: e.target.value
    })
  }

  render() {
    const {
      selskapsnavn,
      navn,
      adresse,
      postkode,
      by,
      land,
      aksjekapital,
      paalydende,
      antallAksjer,
      waitingForSamordnet,
      complete
    } = this.state;

    if (waitingForSamordnet) {
      return <div>Oppretter enhet</div>
    }

    if (complete) {
      return <div>
        Complete!
      </div>
    }

    return (
      <div className="stiftelse">
        <h2>Stiftelsesdokument</h2>
        <TextField label="Selskapsnavn" value={selskapsnavn}
                   onChange={(e) => this.onChange(e, 'selskapsnavn')}></TextField>

        <h3>Stiftere</h3>
        <div>
          <TextField label="Navn" value={navn} onChange={(e) => this.onChange(e, 'navn')}></TextField>
        </div>
        <div>
          <TextField label="Adresse" value={adresse} onChange={(e) => this.onChange(e, 'adresse')}></TextField>
        </div>
        <div>
          <TextField label="Postkode" value={postkode} onChange={(e) => this.onChange(e, 'postkode')}></TextField>
        </div>
        <div>
          <TextField label="By" value={by} onChange={(e) => this.onChange(e, 'by')}></TextField>
        </div>
        <div>
          <TextField label="Land" value={land} onChange={(e) => this.onChange(e, 'land')}></TextField>
        </div>

        <h3>Aksjekapital/Aksjer</h3>
        <div>
          <TextField label="Aksjekapital" value={aksjekapital}
                     onChange={(e) => this.onChange(e, 'aksjekapital')}></TextField>
        </div>
        <div>
          <TextField label="Aksjens pålydende" value={paalydende}
                     onChange={(e) => this.onChange(e, 'paalydende')}></TextField>
        </div>
        <div>
          <TextField label="Antall aksjer" value={antallAksjer}
                     onChange={(e) => this.onChange(e, 'antallAksjer')}></TextField>
        </div>

        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={() => this.onClickSendInn()}>Send inn</Button>
        </div>
      </div>
    );
  }
}
