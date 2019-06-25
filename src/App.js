import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Friends from './components/Friends';
import NavBar from './components/NavBar';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Router lassName="App">

      <div className='friend-list-container'>

        <NavBar />
        <h1 class='app-header'>Route Management System</h1>
        <Container className='container' maxWidth="md">

          <Route
              exact 
              path='/'
              component={Friends}
            />
            {/* <Friends /> */}

                {/* <Link to="/login">Login</Link> */}
                <br></br>

                {/* <Link to="/protected">Protected Page</Link> */}

                <Route 
                exact
                path='/login'
                render={(props) => {
                  return (<Login />)
                }}
                />

            {/* <Route path="/login" component={Login} /> */}
            {/* <PrivateRoute exact path="/protected" component={Friends} /> */}
          </Container>
        </div>
    </Router>
  );
}

export default App;
