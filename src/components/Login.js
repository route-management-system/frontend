import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


import { login, newUser } from '../actions';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    headerText: 'Login to RMS to View Your Saved Routes',
    btnText: 'Log in',
    altAction: 'Or Create Account',
    action: 'login'

  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  toggleLogin = e => {
    this.setState({
      headerText: 'Create An Account to Save Your Routes',
      btnText: 'Create Account',
      altAction: 'Already Have An Account?',
      action: 'new-user'
    });
  };

  handleForm = e => {
    e.preventDefault();
    const action = this.state.action

    if (action == 'login'){
      this.props.login(this.state.credentials).then(res => {
        if (res) {
          this.props.history.push('/protected');
        }
      });
    }
    if (action == 'new-user'){
      console.log('new-user')
      this.props.newUser(this.state.credentials).then(res => {
        if (res) {
          this.props.history.push('/protected')
        }
      });
    }
  }

  render() {

    return (

        <Card id='login-container' body>

        <form id='login-form' onSubmit={this.handleForm}>

          <h2 className='login-header'>
            {this.state.headerText}
          </h2>

          <span id='new-acct-text' onClick={this.toggleLogin}>
            {this.state.altAction}
          </span>

            <TextField
              type="text"
              name="username"
              placeholder="Username"
              label="Username"
              id="outlined-name"
              margin="normal"
              variant="outlined"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />

            <TextField
              value={this.state.credentials.password}
              type="password"
              placeholder="Password"
              name="password"
              label="Password"
              id="outlined-name"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
          <Button outlined onClick={this.handleForm} style = {{backgroundColor: '#f29021', color: 'white'}} >
            {this.props.loggingIn ? (
              <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
            ) : (
              this.state.btnText
            )}
          </Button>
        </form>
        </Card>

    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  loggingIn: state.loggingIn
});

export default connect(
  mapStateToProps,
  { login, newUser }
)(Login);
