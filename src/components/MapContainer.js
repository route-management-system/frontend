import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';
import AzureMap from './AzureMap';
import SearchBox from './SearchBox';
import Loader from 'react-loader-spinner';
import { getLocation } from '../actions';
import axios from 'axios';
const atlas = require('azure-maps-control');

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  }
  componentDidMount() {
    this.props.getLocation();
  }


  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    this.setState({ places: place });
  };

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    

    return (
//width: '50vw',
      <div style={{height: '500px'}}>
    {/* {mapApiLoaded && <SearchBox map={mapInstance} mapApi={mapApi} addplace={this.addPlace} /> } */}
  

    {this.props.gettingLocation ? 
                <div className="key spinner">
                  <Loader type="Puff" color="#204963" height="60" width="60" />
                  <p>Loading Data</p>
                </div>
       : ( 


        <AzureMap />


        // <GoogleMap
        //   defaultZoom={10}
        //   defaultCenter={{lat: this.props.location.latitude, lng: this.props.location.longitude}}
        //   bootstrapURLKeys={{
        //     key: process.env.REACT_APP_MAP_KEY,
        //     libraries: ['places', 'geometry'],
        //   }}
        //   yesIWantToUseGoogleMapApiInternals
        //   onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        // >
        // </GoogleMap>
      )}
      </div>

    )
  }
}

const mapStateToProps = ({location, gettingLocation}) => {
    return {
      location,
      gettingLocation,
      getLocation: () => getLocation(),
      };
  };

export default connect(mapStateToProps, { getLocation })(MapContainer);