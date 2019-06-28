import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getID, addLocation } from '../actions';

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
    this.state = {
      address: '',
      destination: '',
      resultsFlag: false,
      results: []
    }
  }
  componentDidMount() {
    
    this.props.getID();
  }
  // apiHasLoaded = (map, maps) => {
  //   var input = '12424 Thompkins Drive Austin TX'
  //   this.GeocodeLoc(input)
  // }

    GeocodeLoc = (query) => {
       
      axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=PHT6WmE9byX54dGlT6rPXroFGXwCcINQ&location=${query}`)
   .then(res => {
        var data = res;
        const latLng = data.data.results[0].locations[0].latLng
        var lat = parseFloat(latLng.lat)
        var lon = parseFloat(latLng.lng)
        var address = query
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')
        console.log(lat, lon, address, id)
        var postInfo = {"user_id": id, "lat": lat, "lon": lon, "address": address}

        this.props.addLocation(postInfo)
        // this.props.addLocation(id, postInfo)
      })
      .catch(err => {
        console.log(err.response);
      })

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
  
  handleSubmit = e =>{
    e.preventDefault();
    const  query = this.state.destination
    this.GeocodeLoc(query);

    // this.props.addSmurf(newSmurf);
  }
  onChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
    

  };

  clearSearchBox() {
    // this.searchInput.value = '';
  }

  render() {
    return (
      <>

      <Wrapper>
        <form onSubmit={this.handleSubmit} >

        {/* <TextField
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
          /> */}

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

        <Button variant="contained" className='dest-btn' type="submit" color="primary" size="medium" style = {{width: 400}}>
          Add Destination
        </Button>
        </form>


      </Wrapper>

      {/* {!this.state.resultsFlag
            ? <div></div> 
            :<div className="results"> {this.state.results.map(r => {
              return <SearchResults key={r.id} r={r} />
          })}</div>
        } */}
      </>
    );
  }
}

const mapStateToProps = ({location, getID, userID}) => {
  return {
    location,
    getID: () => getID(),
    addLocation: () => addLocation(),
    userID
    };
};

export default connect(mapStateToProps, { getID, addLocation })(SearchBox);