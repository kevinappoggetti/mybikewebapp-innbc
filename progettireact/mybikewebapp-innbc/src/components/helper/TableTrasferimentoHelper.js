import React from 'react';

class TableTrasferimentoHelper extends React.Component{


  render(){
  return(
  <div>
    <table className="ui striped table">
      <thead>
        <tr>
          <th>Id Bicicletta</th>
          <th>Email Destinatario</th>
          <th>Wallet Address</th>
          <th>Approva Richiesta</th>
        </tr>
      </thead>
      <tbody>

      {
        this.props.lista[0].map((list)=>{
          return(
            <tr key={list._id}>
              <td>{list.idBicicletta}</td>
              <td>{
                list.emailDestinatario==="Email"
                ? <div>/</div>
                : <div>{list.emailDestinatario}</div>
              }</td>
              <td>{
                list.walletAddress==="Wallet Address"
                ? <div>/</div>
                : <div>{list.walletAddress}</div>
              }</td>
              <td>
                <button type="button" className="ui button positive basic" onClick={
                  ()=>this.props.onPositiveClick(list._id,list.idBicicletta,list.nomeMittente,list.cognomeMittente,list.emailMittente,
                  list.nomeDestinatario,list.cognomeDestinatario,list.emailDestinatario,list.walletAddress)
                }>Approva</button>
                <button type="button" onClick={()=>this.props.onNegativeClick(list._id,list.emailMittente,list.emailDestinatario,list.idBicicletta)} className="ui button negative basic">Rifiuta</button>
              </td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
  </div>
  )
  }
}

export default TableTrasferimentoHelper;
