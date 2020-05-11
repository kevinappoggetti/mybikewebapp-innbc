import React from 'react';

class ErrorForm extends React.Component{

  render(){
    return(
      <div className="ui negative message">
        <i className="close icon" onClick={()=>this.props.action(this.props.campo)}/>
        <div className="content">
            {this.props.error}
        </div>
      </div>
    );
  }
}

export default ErrorForm;
