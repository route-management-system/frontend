import React from 'react';
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

const SavedRoutes = props => {
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

const mapStateToProps = ({ message }) => ({
    message
  });
  
  export default withRouter(
    connect(
      mapStateToProps
    )(SavedRoutes)
  );
  