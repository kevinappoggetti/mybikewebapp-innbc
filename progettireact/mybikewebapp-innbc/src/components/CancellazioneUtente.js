import React from 'react';
//import LabelAndInput from './helper/LabelAndInput';
import collegamentoConDB from './api/collegamentoConDB';
import ErrorForm from './helper/ErrorForm';

class CancellazioneUtente extends React.Component{

  constructor(props){
    super(props);

    this.state={
      email:'',
      errorEmail:'',
      utenteInDatabase:''
    }

    this.setEmail=this.setEmail.bind(this);
    this.onSubmitForm=this.onSubmitForm.bind(this);
    this.resetErrorMessage=this.resetErrorMessage.bind(this);
  };


  //SET EMAIL
  setEmail=(event)=>{
    this.setState({
      email:event.target.value
    })
  }

  resetErrorMessage =(field)=>{
    if(field==="Email"){
      this.setState({
        errorEmail:''
      })
    }
  }


  //SUBMIT DELLA FORM
  onSubmitForm= async(event)=>{
    event.preventDefault();
    this.refs.btneliminautente.setAttribute("disabled","disabled");
    this.setState({utenteInDatabase:''})
    if(this.state.email===""){
      this.setState({
        errorEmail:'Devi fornire una mail'
      })
      this.refs.btneliminautente.removeAttribute("disabled");
    } else{
      this.setState({
        errorEmail:''
      })
      this.refs.btneliminautente.removeAttribute("disabled");
    }

    if(this.state.email!==""){
      try{
        const email=this.state.email;
        await collegamentoConDB.post('/cancellautente',{email});
        this.setState({
          utenteInDatabase:"Utente Cancellato"
        })
        window.location.reload(false);
      } catch(err){
        console.log("Something went wrong");
        this.setState({
          utenteInDatabase:"L'utente non è presente nel Database"
        })
      }
    }

  }

  render(){
    return(
      <div>
        <h3 className="ui red header">Cancellazione Utente</h3>
        <div className="ui form segment">
          <form className="ui form" onSubmit={this.onSubmitForm}>
            <div className="equal width fields">
              <label htmlFor="cancellautente" className="ui">Email</label>
              <input id="cancellautente" className="ui" type="text" value={this.state.email} onChange={this.setEmail} />

            </div>
            {
              this.state.errorEmail===""
              ? null
              : <ErrorForm campo={"Email"} error={this.state.errorEmail} action={this.resetErrorMessage} />
            }
            <button ref="btneliminautente" className="ui button basic primary" type="submit">
              <i className="search icon" />
              Elimina l'utente
            </button>
          </form>
        </div>
        <div>
        {
          this.state.utenteInDatabase===""
          ? null
          : <div>{this.state.utenteInDatabase}</div>
        }
        </div>
      </div>
    )
  }
}

export default CancellazioneUtente;
