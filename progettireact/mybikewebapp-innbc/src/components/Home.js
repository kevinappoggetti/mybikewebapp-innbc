import React from 'react';
import collegamentoConDB from '../api/collegamentoConDB';

class Home extends React.Component{

  constructor(props){
    super(props);
    this.onCollegamentoConDB=this.onCollegamentoConDB.bind(this);

    this.state={
      risultatoDB:''
    }
  }

  onCollegamentoConDB= async (event)=>{
    try {
      const walletAddress='ox';
      const response= await collegamentoConDB.post('/verificautente', {walletAddress});
      if(response!==true){
        this.setState({
          risultatoDB:'false'
        })
      }
    } catch(err){
      console.log(err)
    }
  }

  render(){
    return(
      <div>
        <button onClick={this.onCollegamentoConDB}>
          Collegamento con DB
        </button>
        {this.state.risultatoDB}
      </div>
    )
  }
}

export default Home;
