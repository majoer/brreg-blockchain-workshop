import React, {Component} from 'react';
import './App.css'
import Que from './Que';
import {RegistryOfCapTablesQue} from "@brreg/sdk";

class App extends Component {

  state = {
    error: false,
    initializing: true,
    capTableQue: undefined
  };

  async componentDidMount() {
    const {ethereum, web3} = window;

    if (ethereum && web3) {
      const capTableQue = await RegistryOfCapTablesQue.init(ethereum);

      this.setState({
        ...this.state,
        capTableQue,
        initializing: false
      });
    } else {
      this.setState({
        ...this.state,
        error: true,
        initializing: false
      });
    }
  }

  render() {
    const {error, capTableQue, initializing} = this.state;

    if (error) {
      return <div>Error while initializing</div>
    }

    if (initializing) {
      return <div>Initializing...</div>
    }

    return (
      <div className="App">
        <Que capTableQue={capTableQue}></Que>
      </div>
    );
  }
}

export default App;
