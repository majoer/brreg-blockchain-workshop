import React, {Component} from 'react';
import pad from 'pad';
import {Redirect} from "react-router-dom";

class Samordnet extends Component {

  state = {
    done: false,
    enhet: undefined
  };

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

    const {stiftelsesDokument} = this.props.location.state;

    const enhet = await this.samordnetRegistermelding(stiftelsesDokument);

    this.setState({
      ...this.state,
      done: true,
      enhet: enhet
    });
  }

  render() {

    const {done, enhet} = this.state;
    const state = {
      enhet
    };

    if (done) {
      return <Redirect to={{pathname: '/stiftelse/company', state}}/>
    }

    return (
      <div>Oppretter enhet via. samordnet registermelding</div>
    )
  }
}

export default Samordnet;
