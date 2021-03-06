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
        <Link to="/cancellazioneutente" className="item">
          Cancellazione Utente
        </Link>
        <Link to="/trasferimentotoken" className="item">
          Trasferimento Token
        </Link>
        <Link to="/modificatoken" className="item">
          Modifica Token
        </Link>
      </div>
    </div>
  );
}

export default Header;
