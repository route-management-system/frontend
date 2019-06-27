import React, { Component, Fragment } from 'react';
import Iframe from 'react-iframe'
import { connect } from 'react-redux';
import AzureMap from './AzureMap';
import SearchBox from './SearchBox';
import Loader from 'react-loader-spinner';
import { getLocation } from '../actions';
import axios from 'axios';


class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };
  }
  componentDidMount() {
    this.props.getLocation();
  }

  render() {

    return (

      <div className='map-container' style={{height: '500px'}}>

    {this.props.gettingLocation ? 
                <div className="key spinner">
                  <Loader type="Puff" color="#204963" height="60" width="60" />
                  <p>Loading Data</p>
                </div>
       : ( 

        // <AzureMap />
        
    <Iframe url="http://localhost:8080/trafficoverlay.html"
        width="900px"
        height="600px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
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