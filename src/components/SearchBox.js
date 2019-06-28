import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import SearchResults from './SearchResults'
import axios from 'axios';
const atlas = require('azure-maps-control');
const atlasService = require('azure-maps-rest');

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
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      address: '',
      destination: '',
      resultsFlag: false,
      results: []
    }
  }

  // componentDidMount({ map, mapApi } = this.props) {
  //   this.searchBox = new mapApi.places.SearchBox(this.searchInput);
  //   this.searchBox.addListener('places_changed', this.onPlacesChanged);
  //   this.searchBox.bindTo('bounds', map);
  //   var geocoder = new mapApi.Geocoder;
  //   var input = this.props.location
  //   this.reverseGeocodeLoc(geocoder, input)
  // }

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

  onChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
    let inputLength = e.target.value.length
    if ( e.target.value.length >= 3) {
      setTimeout( e.target.value.length == inputLength ? this.handleSearch(e.target.value) : null , 150);
    } else {
      let searchInputLength = e.target.value.length;
    }
  };

  handleSearch = query => {
    const map = this.props.map
    const authOptions = {
      authType: 'subscriptionKey',
      subscriptionKey: 'druzvY1gFuIVmFZaZEb19x8uQ4O1Li1SeIJqfHe47Ng'
    }
    let datasource = new atlas.source.DataSource();
    map.sources.add(datasource);
    var pipeline = atlasService.MapsURL.newPipeline('druzvY1gFuIVmFZaZEb19x8uQ4O1Li1SeIJqfHe47Ng');
    var searchURL = new atlasService.SearchURL(pipeline);


    axios.get(`https://atlas.microsoft.com/search/poi/json?subscription-key=druzvY1gFuIVmFZaZEb19x8uQ4O1Li1SeIJqfHe47Ng&api-version=1.0&query={query}`)
    .then(res => {
      var data = res.data.results;
      console.log(data)
      this.setState({ results: data });
      this.setState({ resultsFlag: true });
    })
    .catch(err => {
      console.log(err.response);
    });


  }


    
  clearSearchBox() {
    // this.searchInput.value = '';
  }

  render() {
    return (
      <>

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

        <TextField
          id='input-end'
          type="text"
          name='destination'
          value={this.state.destination}
          placeholder="Destination"
          label="Destination"
          id="outlined-name"
          margin="normal"
          variant="outlined"
          style = {{width: 400}}
          onChange={this.onChangeHandler}
        />
      </Wrapper>

      {!this.state.resultsFlag
            ? <div></div> 
            :<div className="results"> {this.state.results.map(r => {
              return <SearchResults key={r.id} r={r} />
          })}</div>
        }
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