import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { getData } from '../actions';
import FriendCard from './FriendCard';

class Friends extends React.Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
    <div>            
    
    {this.props.fetchingData ? (
                <div className="key spinner">
                  <Loader type="Puff" color="#204963" height="60" width="60" />
                  <p>Loading Data</p>
                </div>
      ) : ( 
        <>
            <Grid container className='friend-list' spacing={4}>
            <h3>Accidents Nearby</h3>
            {this.props.friends.map(f => (
                <FriendCard key={f.id} friend={f} />
            ))}
            </Grid>
            
        </>
      )}
      </div>
    );
  }
}

const mapStateToProps = ({ error, friends, fetchingData }) => ({
  error,
  friends,
  fetchingData
});

export default withRouter(
  connect(
    mapStateToProps,
    { getData }
  )(Friends)
);
