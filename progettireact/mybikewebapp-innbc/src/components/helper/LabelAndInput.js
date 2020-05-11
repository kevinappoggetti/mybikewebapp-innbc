import React from 'react';

class LabelAndInput extends React.Component{

  handleChange= (e) =>{
    this.props.setVariabile(e.target.value);
  }

  render(){
    return (
        <div className="inline field">
          <label htmlFor={this.props.label} >{this.props.label}</label>
          <div className="ui fluid input"><input placeholder={this.props.label} id={this.props.label} type="text" value={this.props.variabile} onChange={this.handleChange}/></div>
        </div>
      );
  }
}

export default LabelAndInput;
