import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

class LoaderComponent extends React.Component{
  render(){
    return(
      <div className="loader">
        <Loader
          type="Oval"
          color="#00BFFF"
          height={150}
          width={150}
         />
      </div>
    );
  }
}

export default LoaderComponent;
