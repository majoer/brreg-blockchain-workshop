import React, {Component} from 'react';
import './App.css'
import Que from './Que';
import {RegistryOfCapTablesQue, RegistryOfCapTables, StockFactory, EntityRegistry} from "@brreg/sdk";
import {Stiftelse} from "./Stiftelse";
import {Route, BrowserRouter as Router} from "react-router-dom";

class App extends Component {

  state = {
    error: false,
    initializing: true,
    capTableQue: undefined,
    capTable: undefined,
    stockFactory: undefined
  };

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
    const {error, capTableQue, capTables, entityRegistry, stockFactory, initializing} = this.state;

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
          <Route path="/stiftelse" component={() => <Stiftelse capTables={capTables}
                                                               stockFactory={stockFactory}
                                                               entityRegistry={entityRegistry}/>}/>
        </Router>
      </div>
    );
  }
}

export default App;
