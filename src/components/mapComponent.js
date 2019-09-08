import React from "react";
import { connect } from "react-redux";
import { setSelectedProperty, fetchTransaction } from '../store/actions'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"

class MapComponent extends React.Component {
  componentDidMount(){

    this.props.dispatch(fetchTransaction());

  }

  render(){
    const{items, loading, error, selectedProperty} = this.props;
    console.log(error)
    if(error){
      return <h1>Error! {error.message}, either wrong endpoint or server is not being served!</h1>;
    }

    if(loading){
      return <h1> Loading...</h1>;
    }

    return (
        <GoogleMap
          defaultZoom={12}
          defaultCenter = {{lat:43.673225 , lng: -79.383186}}
        >
        {items && items.map( item => {
          return (
            <Marker key={item.property_key} position = {{
              lat: item.location.lat, lng: item.location.lng
            }} />
          );
        })}
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
