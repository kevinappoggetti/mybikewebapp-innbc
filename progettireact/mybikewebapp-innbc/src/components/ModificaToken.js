import React from 'react';
import collegamentoConDB from './api/collegamentoConDB';
import TableModificaHelper from './helper/TableModificaHelper';
import web3 from './smartcontract/web3';
import contract from './smartcontract/contract';
import Loader from './helper/Loader';

class ModificaToken extends React.Component{

  constructor(props){
    super(props);

    this.state={
      listaDiRichieste:[],
      isLoading:false
    }
  }

  async componentDidMount(){
    this.setState({
      listaDiRichieste:[],
      isLoading:true
    });

    try {
      const response= await collegamentoConDB.get('/updates/mostrarichieste');
      console.log("data"+response.data);
      if(response.data!==false){
        this.setState({
          listaDiRichieste:[...this.state.listaDiRichieste, response.data]
        })
      }
      console.log(this.state.listaDiRichieste);
      this.setState({
        isLoading:false
      })
    } catch(err){
      console.log(err);
      this.setState({
        isLoading:false
      })
    }
  }

  onNegativeClick=async(_id)=>{
    console.log(_id);
    await collegamentoConDB.post('/updates/richiestaverificata',{_id});
    window.location.reload(false);
  }


  onPositiveClick=async(_id,idBicicletta,marca,modello,telaio,colore,tipologiaBicicletta,
  fotoBicicletta,dataDAcquisto,fotoDataDAcquisto,segniParticolari,fotoSegniParticolari)=>{

    try{

      window.ethereum.enable()
      await collegamentoConDB.post('/updates/richiestaverificata',{_id});
      const counter = await contract.methods.getCounterByTokenId(idBicicletta).call();
      const accounts= await web3.eth.getAccounts();
      await contract.methods.burnAndMint(
        counter,
        marca,
        modello,
        telaio,
        colore,
        tipologiaBicicletta,
        fotoBicicletta,
        dataDAcquisto,
        fotoDataDAcquisto,
        segniParticolari,
        fotoSegniParticolari,
        idBicicletta
      ).send({
        from:accounts[0]
      })
      window.location.reload(false);
    } catch(err){
      console.log(err);
    }
  }

  render(){
    return(
      <div>
      <div className="ui container">
      {
        this.state.isLoading===true
        ? <Loader />
        : <div>
        {
          this.state.listaDiRichieste.length===0
          ? <p>Non ci sono modifiche da approvare</p>
          :
            <div>
              <TableModificaHelper onPositiveClick={this.onPositiveClick} onNegativeClick={this.onNegativeClick} lista={this.state.listaDiRichieste} />
            </div>
        }
          </div>
      }

      </div>
    </div>
    );
  }
}

export default ModificaToken;
