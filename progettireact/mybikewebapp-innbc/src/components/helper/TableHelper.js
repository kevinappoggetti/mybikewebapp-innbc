import React from 'react';

class TableHelper extends React.Component{

  // constructor(props){
  //   super(props);
  //   //this.onPositiveClick=this.onPositiveClick.bind(this);
  //   //this.onNegativeClick=this.onNegativeClick.bind(this);
  // }

  render(){
  return(
  <div>
    <table className="ui striped table">
      <thead>
        <tr>
          <th>Id Richiesta</th>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Email</th>
          <th>Id Bicicletta</th>
          <th>Approva Richiesta</th>
        </tr>
      </thead>
      <tbody>

      {
        this.props.lista[0].map((list)=>{
          return(
            <tr key={list._id}>
              <td>{list._id}</td>
              <td>{list.nome}</td>
              <td>{list.cognome}</td>
              <td>{list.email}</td>
              <td>{list.idBicicletta}</td>
              <td>
                <button type="button" className="ui button positive basic" onClick={
                  ()=>this.props.onPositiveClick(
                    list._id,list.marca,list.modello,list.telaio,list.colore,list.tipologiaBicicletta,
                    list.fotoBicicletta,list.dataDAcquisto,list.fotoDataDAcquisto,list.segniParticolari,
                    list.fotoSegniParticolari,list.idBicicletta,list.nome,list.cognome,list.dataDiNascita,
                    list.citta,list.indirizzo,list.cap,list.email,list.password)
                }>Approva</button>
                <button type="button" onClick={()=>this.props.onNegativeClick(list._id)} className="ui button negative basic">Rifiuta</button>
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

export default TableHelper;
