import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';


const IncidentCard = props => {
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

    return(
  <Grid item key={props.id} xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
            {props.incident.address}
        </Typography>
        <Typography variant="body2" component="p">
          <em>Approx. Travel Delay: {Math.floor(Math.random() * 60)} </em>
          {/* {props.incident.id} */}
        </Typography>
        <Typography variant="body2" component="a">
          Update
        </Typography>
      </CardContent>
    </Card>
  </Grid>




    )
}

export default IncidentCard