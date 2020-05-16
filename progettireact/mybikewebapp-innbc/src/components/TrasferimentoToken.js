import React from 'react';
import collegamentoConDB from './api/collegamentoConDB';
import TableTrasferimentoHelper from './helper/TableTrasferimentoHelper';
import Loader from './helper/Loader';

class TrasferimentoToken extends React.Component{

  constructor(props){
    super(props);

    this.state={
      listaDiTrasferimenti:[],
      isLoading:false
    }
  }

  async componentDidMount(){
    this.setState({
      listaDiTrasferimenti:[],
      isLoading:true
    });

    try {
      const response= await collegamentoConDB.get('/transfers/mostrarichieste');
      if(response!==false){
        this.setState({
          listaDiTrasferimenti:[...this.state.listaDiTrasferimenti, response.data]
        })
      }
      console.log((this.state.listaDiTrasferimenti[0]));
      this.setState({
        isLoading:false
      })
    }
    catch(err){
      this.setState({
        isLoading:false
      })
      console.log(err)
    }
  }

  onNegativeClick=async(_id)=>{
    console.log(_id);
    await collegamentoConDB.post('/transfers/richiestaverificata',{_id});
    window.location.reload(false);
  }

  onPositiveClick=async(_id,idBicicletta,nomeMittente,cognomeMittente,emailMittente,
  nomeDestinatario,cognomeDestinatario,emailDestinatario)=>{

    try{
      const email= emailDestinatario;
      await collegamentoConDB.post('/ownerships/trasferiscipossesso',{email,idBicicletta});
      await collegamentoConDB.post('/transfers/richiestaverificata',{_id});
      const response=await collegamentoConDB.post('/verificautente',{email});
      console.log(response);
      if(response.data===false){
        const dataDiNascita="data";
        const citta="citta";
        const indirizzo= "indirizzo";
        const cap="cap"
        const walletAddress="wallet address"
        const password="password";
        const nome=nomeDestinatario;
        const cognome=cognomeDestinatario;
        await collegamentoConDB.post('/inserisciutente',{nome,cognome,
        dataDiNascita,citta,indirizzo,cap,email,walletAddress,password});
      }
      window.location.reload(false);
    } catch(err){
      console.log(err);
    }
  }

  render(){
    return(
      <div className="ui container">
      {
        this.state.isLoading===true
        ? <Loader />
        : <div>
          {
            this.state.listaDiTrasferimenti.length===0
            ? <p>Non ci sono trasferimenti da approvare</p>
            :
              <div>
                <TableTrasferimentoHelper onPositiveClick={this.onPositiveClick} onNegativeClick={this.onNegativeClick} lista={this.state.listaDiTrasferimenti} />
              </div>
          }
          </div>
      }

      </div>
    )
  }
}

export default TrasferimentoToken;
