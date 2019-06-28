import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox'
import IncidentCard from './IncidentCard'
import { getData } from '../actions';





const SavedRoutes = props => {

  useEffect(() => {
    var id = localStorage.getItem('id')
    props.getData(id);
  }, []);




  const reverseGeocodeLoc = (geocoder, input) => {
    var latlng = {lat: parseFloat(input.latitude), lng: parseFloat(input.longitude)};
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY



  }

  const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    icon: {
      color: '#ff000073', 
      paddingLeft: '5rem'
    }
  });

  const classes = useStyles();


  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref}  {...props} />);

  const locations = props.locations
    return(
      <div className='saved-routes-container'>
    <h2 className='login-header'>
        {props.message ? props.message : localStorage.getItem('message')}
    </h2>

    <div>

        {props.fetchingData ? (
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
              <h3>Your Saved Routes</h3>
        




              {props.locations.map((i) => (
   
                   <IncidentCard key={i.id} incident={i} />
             ))} 
            </Grid>
            
        </>
      )}


        <SearchBox />




    </div>

    <Button color="primary" component={AdapterLink} to="/logout">Logout</Button>

      </div>
//   <Grid item key={props.id} xs={12} sm={6} md={4}>
//     <Card className={classes.card}>
//       <CardContent>
//         <Typography variant="h5" component="h2">
//             {props.incident.type}
//         </Typography>
//         <Typography variant="body2" component="p">
//             {props.incident.address}
//         </Typography>
//       </CardContent>
//     </Card>
//   </Grid>

    )
}

const mapStateToProps = ({ message, fetchingData, users, locations }) => ({
    message,
    fetchingData,
    users,
    locations,
  });
  
  export default withRouter(
    connect(
      mapStateToProps, { getData } )(SavedRoutes)
  );
  