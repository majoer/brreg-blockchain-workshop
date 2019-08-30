import React, {Component} from 'react';
import './App.css'
import Que from './Que';
import {Stiftelse} from "./stiftelse/Stiftelse";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CapTable from "./stiftelse/CapTable";
import Samordnet from "./stiftelse/Samordnet";
import Complete from "./stiftelse/Complete";
import Entity from './stiftelse/Entity';
import Company from "./stiftelse/Company";

class App extends Component {

  state = {
    error: false,
  };

  async componentDidMount() {
    const {ethereum, web3} = window;

    if (!(ethereum && web3)) {
      this.setState({
        ...this.state,
        error: true
      });
    }
  }

  render() {
    const {error} = this.state;

    if (error) {
      return <div>Error while initializing</div>
    }

    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={() => <div>Nothing here</div>}/>
          <Route path="/que" component={Que}/>
          <Route path="/stiftelse" exact component={Stiftelse}/>

          <Route path="/stiftelse/company" component={Company}/>
          <Route path="/stiftelse/entity" component={Entity}/>
          <Route path="/stiftelse/capTable" component={CapTable}/>
          <Route path="/stiftelse/samordnet" component={Samordnet}/>
          <Route path="/stiftelse/complete" component={Complete}/>

        </Router>
      </div>
    );
  }
}

export default App;
