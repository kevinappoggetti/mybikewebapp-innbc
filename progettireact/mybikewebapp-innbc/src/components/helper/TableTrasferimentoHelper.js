import React from 'react';

class TableTrasferimentoHelper extends React.Component{


  render(){
  return(
  <div>
    <table className="ui striped table">
      <thead>
        <tr>
          <th>Id Bicicletta</th>
          <th>Nome Mittente</th>
          <th>Cognome Mittente</th>
          <th>Email Mittente</th>
          <th>Nome Destinatario</th>
          <th>Cognome Destinatario</th>
          <th>Email Destinatario</th>
          <th>Approva Richiesta</th>
        </tr>
      </thead>
      <tbody>

      {
        this.props.lista[0].map((list)=>{
          return(
            <tr key={list._id}>
              <td>{list.idBicicletta}</td>
              <td>{list.nomeMittente}</td>
              <td>{list.cognomeMittente}</td>
              <td>{list.emailMittente}</td>
              <td>{list.nomeDestinatario}</td>
              <td>{list.cognomeDestinatario}</td>
              <td>{list.emailDestinatario}</td>
              <td>
                <button type="button" className="ui button positive basic" onClick={
                  ()=>this.props.onPositiveClick(list._id,list.idBicicletta,list.nomeMittente,list.cognomeMittente,list.emailMittente,
                  list.nomeDestinatario,list.cognomeDestinatario,list.emailDestinatario)
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
