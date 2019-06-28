import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MapContainer from './MapContainer';
import { getData } from '../actions';
import IncidentCard from './IncidentCard';
import SearchBox from './SearchBox';

class AppContainer extends React.Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
    <div>

      {/* <SearchBox /> */}
      <h2 className='app-sub-header'>
        Traffic & Construction in Your Area
      </h2>
      <h3 className='app-cta'>Login to Save Your Routes and Destinations</h3>
      <MapContainer />
    
      {/* {this.props.fetchingData ? (
        <div className="key spinner">
          <Loader
              type="Puff" 
              color="#204963" 
              height="60" 
              width="60" 
          />
          <p>Loading Data</p>
        </div>
      ) : ( 
        <>
            <Grid container className='incident-list' spacing={4}>
            <h3>Accidents Nearby</h3>
            {this.props.traffic.map(i => (
                <IncidentCard key={i.id} incident={i} />
            ))}
            </Grid>
            
        </>
      )} */}
      </div>
    );
  }
}

const mapStateToProps = ({ error, traffic, fetchingData }) => ({
  error,
  traffic,
  fetchingData
});

export default withRouter(
  connect(
    mapStateToProps,
    { getData }
  )(AppContainer)
);
