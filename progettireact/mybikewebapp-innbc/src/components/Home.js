import React from 'react';
import collegamentoConDB from './api/collegamentoConDB';
import TableHelper from './helper/TableHelper';
import contract from './smartcontract/contract';
import web3 from './smartcontract/web3';
import Loader from './helper/Loader';

class Home extends React.Component{

  constructor(props){
    super(props);

    //this.onCollegamentoConDB=this.onCollegamentoConDB.bind(this);
    this.state={
      listaDiRichieste:[],
      isLoading:false,
      transactionHash:''
    }
  }

  async componentDidMount(){
    this.setState({
      listaDiRichieste:[],
      isLoading:true
    });

    try {
      const response= await collegamentoConDB.get('/requests/mostrarichieste');
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
        // console.log(this.state.listaDiRichieste[0][1].nome);
    }
    catch(err){
      this.setState({isLoading:false})
      console.log(err)
    }
  }

  onNegativeClick=async(_id,email,idBicicletta)=>{
    console.log(_id);
    //Cambiamento stato richiestaCompletata
    await collegamentoConDB.post('/requests/richiestaverificata',{_id});
    await collegamentoConDB.post('/requests/inviaemailcreazionetokennegata',{email, idBicicletta});
    window.location.reload(false);

  }

  onPositiveClick= async (_id,marca,modello,telaio,colore,tipologiaBicicletta,fotoBicicletta,
    dataDAcquisto,fotoDataDAcquisto,segniParticolari,fotoSegniParticolari,idBicicletta,nome,cognome,
    dataDiNascita,citta,indirizzo,cap,email,password)=>{
    console.log(_id);
    //Chiamata allo SC

    try{
      this.setState({
        isLoading:true
      })
      window.ethereum.enable();
      const accounts= await web3.eth.getAccounts();
      await contract.methods.mint(
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
              from: accounts[0],
            }).on('transactionHash', (hash)=>{
              this.setState({
                transactionHash:hash
              })
              console.log(hash);
            });
      //Cambiamento stato richiestaCompletata nel DB -> Notificare l'utente dell'hash tramite mail
       await collegamentoConDB.post('/requests/richiestaverificata',{_id});
       await collegamentoConDB.post('/requests/cancellarichiestestessotoken',{idBicicletta});
       await collegamentoConDB.post('/ownerships/aggiungipossesso',{email,idBicicletta});
       const hash = this.state.transactionHash
       await collegamentoConDB.post('/requests/inviaemailcreazionetoken',{email,idBicicletta,hash});
       // const utenteVerificato= await collegamentoConDB.post('/verificautente',{email});
       // console.log("utenteVerificato"+utenteVerificato);
       // if(utenteVerificato.data!==true){
       //   console.log("sono qui");
       //   const walletAddress="wallet";
       //   await collegamentoConDB.post('/inserisciutente',{nome,cognome,dataDiNascita,
       //   citta,indirizzo,cap,email,walletAddress,password})
       // }
       this.setState({
         isLoading:false
       })
       window.location.reload(false);
    } catch(err){
      console.log(err);
      this.setState({
        isLoading:false
      })
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
            this.state.listaDiRichieste.length===0
            ? <p>Non ci sono richieste da approvare</p>
            :
              <div>
                <TableHelper onPositiveClick={this.onPositiveClick} onNegativeClick={this.onNegativeClick} lista={this.state.listaDiRichieste} />
              </div>
          }
          </div>
        }

      </div>
    )
  }
}

export default Home;
