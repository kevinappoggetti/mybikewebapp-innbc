import React from 'react';

class TableModificaHelper extends React.Component{


  render(){
  return(
  <div>
    <table className="ui striped table">
      <thead>
        <tr>
          <th>Id Bicicletta</th>
          <th>Email</th>
          <th>Marca</th>
          <th>Modello</th>
          <th>Telaio</th>
          <th>Approva Richiesta</th>
        </tr>
      </thead>
      <tbody>

      {
        this.props.lista[0].map((list)=>{
          return(
            <tr key={list._id}>
              <td>{list.idBicicletta}</td>
              <td>{list.email}</td>
              <td>{list.marca}</td>
              <td>{list.modello}</td>
              <td>{list.telaio}</td>

              <td>
                <button type="button" className="ui button positive basic" onClick={
                  ()=>this.props.onPositiveClick(list._id,list.idBicicletta,list.email,list.marca,list.modello,list.telaio,
                  list.colore,list.tipologiaBicicletta,list.fotoBicicletta,list.dataDAcquisto,list.fotoDataDAcquisto,
                  list.segniParticolari,list.fotoSegniParticolari)
                }>Approva</button>
                <button type="button" onClick={()=>this.props.onNegativeClick(list._id,list.email,list.idBicicletta)} className="ui button negative basic">Rifiuta</button>
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

export default TableModificaHelper;
