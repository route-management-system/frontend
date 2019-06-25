import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.state = {
      address: ''
    }
  }

  componentDidMount({ map, mapApi } = this.props) {
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
    this.searchBox.bindTo('bounds', map);
    var geocoder = new mapApi.Geocoder;
    var input = this.props.location
    this.reverseGeocodeLoc(geocoder, input)
  }

    reverseGeocodeLoc = (geocoder, input) => {
      var latlng = {lat: parseFloat(input.latitude), lng: parseFloat(input.longitude)};

      geocoder.geocode({'location': latlng}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            console.log(results[0])
            this.setState({address: results[0].formatted_address})
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });

    }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlacesChanged = ({ map, addplace } = this.props) => {
    const selected = this.searchBox.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    addplace(selected);
    this.searchInput.blur();
  };

    onChangeHandler = () => {
      // const directionsService = new this.props.mapApi.DirectionsService;
      // const directionsDisplay = new this.props.mapApi.DirectionsRenderer;
      // const map = this.props.map;
      // directionsService.route({
      //   origin: document.getElementById('start').value,
      //   destination: document.getElementById('end').value,
      //   travelMode: 'DRIVING'
      // }, function(response, status) {
      //   if (status === 'OK') {
      //     directionsDisplay.setDirections(response);
      //     directionsDisplay.setMap(map);

      //   } else {
      //     window.alert('Directions request failed due to ' + status);
      //   }
      // });
    };
    
  clearSearchBox() {
    // this.searchInput.value = '';
  }

  render() {
    return (
      <>
      {/* <div id="floating-panel">
        <b>Start: </b>
        <select id="start" onChange={this.onChangeHandler}>
          <option value="san bernardino, ca">San Bernardino</option>
          <option value="los angeles, ca">Los Angeles</option>
        </select>
        <b>End: </b>
        <select id="end" onChange={this.onChangeHandler}>
          <option value="chicago, il">Chicago</option>
          <option value="st louis, mo">St Louis</option>
        </select>
        </div> */}

      <Wrapper>


        <TextField
            id='input-start'
            ref={(ref) => {
              this.searchInput = ref;
            }}
            value={this.state.address}
            type="text"
            onFocus={this.clearSearchBox}
            placeholder="Start"
            label="Start"
            id="outlined-name"
            margin="normal"
            variant="outlined"
            style = {{width: 400}}
          />

        {/* <input
          id='input-start'
          ref={(ref) => {
            this.searchInput = ref;
          }}
          value={this.state.address}
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Start"
        /> */}

        <TextField
          id='input-end'
          type="text"
          placeholder="Destination"
          id="outlined-name"
          margin="normal"
          variant="outlined"
        />
      </Wrapper>
      </>
    );
  }
}

const mapStateToProps = ({location, gettingLocation}) => {
  return {
    location
    };
};

export default connect(mapStateToProps)(SearchBox);