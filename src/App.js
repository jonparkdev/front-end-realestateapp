import React from 'react';
import './App.css';
import WrapMap from './components/mapComponent'

class App extends React.Component {
  render(){
    return (
      <div style = {{width: "90vw", height:"90vh"}} >
        <WrapMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDpNVYq6AiRpTqFBw0zARrDdlahN0Rle28`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
