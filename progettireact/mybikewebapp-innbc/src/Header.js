import React from 'react';
import {Link} from 'react-router-dom';

const Header = ()=>{
  return(
    <div className="ui secondary pointing menu">
      <div className="left menu">
        <Link to = "/" className="item" >
          Home Page
        </Link>
      </div>
      <div className="right menu">
        <Link to="/creazionetoken" className="item">
          Creazione Token
        </Link>
        <Link to="/cancellazioneutente" className="item">
          Cancellazione Utente
        </Link>
        <Link to="/trasferimentotoken" className="item">
          Trasferimento Token
        </Link>
      </div>
    </div>
  );
}

export default Header;
