import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { adminConsole } from '../actions';



const SavedRoutes = props => {

  useEffect(() => {
    const token = { "token": localStorage.getItem('token')}
    props.adminConsole(token);
  }, []);

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


    return(
      <>
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
          {props.users.map(user => (
              <div key={user.id}>
                <span> {user.id} </span>
                <span> {user.username} </span>
              </div>
          ))}
            
        </>
      )}

    </div>

    <Button component={AdapterLink} to="/logout">Logout</Button>

      </>
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

const mapStateToProps = ({ message, fetchingData, users }) => ({
    message,
    fetchingData,
    users
  });
  
  export default withRouter(
    connect(
      mapStateToProps,
      { adminConsole }
    )(SavedRoutes)
  );
  