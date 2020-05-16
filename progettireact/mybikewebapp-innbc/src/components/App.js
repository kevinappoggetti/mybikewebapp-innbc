import React from 'react';
import Header from '../Header';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from '../components/Home';
import CancellazioneUtente from '../components/CancellazioneUtente';
import TrasferimentoToken from '../components/TrasferimentoToken';
import ModificaToken from '../components/ModificaToken';

class App extends React.Component{
  render(){
    return(
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/cancellazioneutente" exact component={CancellazioneUtente} />
            <Route path="/trasferimentotoken" exact component={TrasferimentoToken} />
            <Route path="/modificatoken" exact component={ModificaToken} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
