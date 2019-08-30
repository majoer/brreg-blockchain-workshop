import React, {Component} from 'react';
import './App.css'
import Que from './Que';
import {RegistryOfCapTablesQue, RegistryOfCapTables, StockFactory, EntityRegistry} from "@brreg/sdk";
import {Stiftelse} from "./stiftelse/Stiftelse";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Address from "./stiftelse/Address";
import CapTable from "./stiftelse/CapTable";
import Samordnet from "./stiftelse/Samordnet";
import Complete from "./stiftelse/Complete";
import Entity from './stiftelse/Entity';

class App extends Component {

  state = {
    stiftelsesDokument: undefined,
    enhet: undefined,
    address: undefined,

    error: false,
    initializing: true,
    capTableQue: undefined,
    capTable: undefined,
    stockFactory: undefined
  };

  setStiftelseDokumentState(stiftelsesDokument) {
    this.setState({...this.state, stiftelsesDokument});
  }

  setEnhetState(enhet) {
    this.setState({...this.state, enhet});
  }

  setAddressState(address) {
    this.setState({...this.state, address});
  }

  async componentDidMount() {
    const {ethereum, web3} = window;

    if (ethereum && web3) {
      const capTableQue = await RegistryOfCapTablesQue.init(ethereum);
      const capTables = await RegistryOfCapTables.init(ethereum);
      const stockFactory = await StockFactory.init(ethereum);
      const entityRegistry = await EntityRegistry.init(ethereum);

      this.setState({
        ...this.state,
        capTableQue,
        capTables,
        stockFactory,
        entityRegistry,
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
    const {stiftelsesDokument, enhet, address, error, capTableQue, capTables, entityRegistry, stockFactory, initializing} = this.state;

    if (error) {
      return <div>Error while initializing</div>
    }

    if (initializing) {
      return <div>Initializing...</div>
    }

    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={() => <div>Nothing here</div>}/>
          <Route path="/que" component={() => <Que capTableQue={capTableQue}/>}/>
          <Route path="/stiftelse" exact component={(props) => <Stiftelse
                                                                {...props}
                                                               setStiftelseDokumentState={(stiftelsesDokument) => this.setStiftelseDokumentState(stiftelsesDokument)}/>}/>
          <Route path="/stiftelse/entity" component={(props) => <Entity enhet = {enhet}
                                                                {...props}
                                                               stockFactory={stockFactory}
                                                               entityRegistry={entityRegistry}
                                                               setAddressState={(address) => this.setAddressState(address)}/>} />
          <Route path="/stiftelse/address" component={() => <Address/>} />
          <Route path="/stiftelse/capTable" component={(props) => <CapTable address={address}
                                                                {...props}
                                                                 capTables={capTables}/>} />
          <Route path="/stiftelse/samordnet" component={(props) => <Samordnet stiftelsesDokument={stiftelsesDokument}
                                                                {...props}
                                                                          setEnhetState={(enhet) => this.setEnhetState(enhet)}/>} />
          <Route path="/stiftelse/complete" component={() => <Complete/>} />
        
        </Router>
      </div>
    );
  }
}

export default App;
