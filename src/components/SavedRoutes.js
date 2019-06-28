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
import styled from 'styled-components';

const People = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;
	align-items: stretch;
	margin: 20px 0;
`;

const CardPerson = styled.div`
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	margin: 20px;
	width: 25%;
	border-radius: 10px;
	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
`;

const PersonImg = styled.img`
	width: 100%;
	border-radius: 10px 10px 0 0;
`;

const ContainerPerson = styled.div`
	padding: 2px 16px;
	text-align: center;
	font-size: 1.2rem;
`;

const SavedRoutes = (props) => {
	useEffect(() => {
		const token = { token: localStorage.getItem('token') };
		props.adminConsole(token);
	}, []);

	const useStyles = makeStyles({
		card: {
			minWidth: 275
		},
		bullet: {
			display: 'inline-block',
			margin: '0 2px',
			transform: 'scale(0.8)'
		},
		title: {
			fontSize: 14
		},
		pos: {
			marginBottom: 12
		},
		icon: {
			color: '#ff000073',
			paddingLeft: '5rem'
		}
	});

	const classes = useStyles();

	const AdapterLink = React.forwardRef((props, ref) => (
		<Link innerRef={ref} {...props} />
	));

	return (
		<>
			<h2 className='login-header'>
				{props.message
					? props.message
					: localStorage.getItem('message')}
			</h2>

			<div>
				{props.fetchingData ? (
					<div className='key spinner'>
						<Loader
							type='Puff'
							color='#204963'
							height='60'
							width='60'
						/>
						<p>Loading Data</p>
					</div>
				) : (
					<>
						<h1 className='login-header'>
							They also use Route Management System:
						</h1>
						<People>
							{props.users
								.sort(() => 0.5 - Math.random())
								.slice(0, 5)
								.map((user) => (
									<CardPerson key={user.id}>
										<PersonImg
											src={`https://api.adorable.io/avatars/${
												user.id
											}`}
											alt={user.username}
										/>
										<ContainerPerson>
											{user.username}
										</ContainerPerson>
									</CardPerson>
								))}
						</People>
					</>
				)}
			</div>

			<Button component={AdapterLink} to='/logout'>
				Logout
			</Button>
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
	);
};

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
