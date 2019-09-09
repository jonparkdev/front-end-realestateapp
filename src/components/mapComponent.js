import React, { Component } from "react";
import { connect } from "react-redux";
import { setSelectedProperty, fetchTransaction } from '../store/actions'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps"

class MapComponent extends Component {
  componentDidMount(){

    this.props.dispatch(fetchTransaction());

  }

  render(){
    const{items, loading, error, selectedProperty} = this.props;

    if(error){
      return <h1>Error! {error.message}, either wrong endpoint or server is not being served!</h1>;
    }

    if(loading){
      return <h1> Loading...</h1>;
    }

    return (
        <GoogleMap
          defaultZoom={11.5}
          defaultCenter = {{lat:43.703225 , lng: -79.383186}}
        >
        {items.map((item) => (
          <Marker
            key={item.property_id}
            position = {{
              lat: item.location.lat,
              lng: item.location.lng
            }}
            onClick ={() => {
              this.props.dispatch(setSelectedProperty(item));
            }}
          />

        ))}
        {selectedProperty && (
          <InfoWindow
          position = {{
            lat: selectedProperty.location.lat,
            lng: selectedProperty.location.lng
          }}
          onCloseClick= {() => {
            this.props.dispatch(setSelectedProperty(null))
          }}
          >
            <div>
              <h2> Property Type: {selectedProperty.property_type} </h2>
              <h2> Price: ${new Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(selectedProperty.price)} </h2>
            </div>

          </InfoWindow>
        )}



        </GoogleMap>
      );
    }
}

const WrapMap = withScriptjs(withGoogleMap(MapComponent));

const mapStateToProps = state => ({
  items: state.items,
  loading: state.loading,
  error: state.error,
  selectedProperty: state.selectedProperty
});

export default connect(mapStateToProps)(WrapMap);
