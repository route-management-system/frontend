import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import AppContainer from './components/AppContainer';
import NavBar from './components/NavBar';
import SavedRoutes from './components/SavedRoutes';
import LogoutPage from './components/LogoutPage';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Router className="App">
      
      <div className='friend-list-container'>

        <NavBar />

        <h1 class='app-header'>
          Route Management System
        </h1>

        <Container 
          className='container' 
          maxWidth="md"
        >

          <Route
              exact 
              path='/'
              component={AppContainer}
            />

            <Route 
              path="/login" 
              component={Login} 
            />

            <Route 
              path="/logout" 
              component={LogoutPage} 
            />

            <PrivateRoute 
              exact 
              path="/protected" 
              component={SavedRoutes} 
            />

          </Container>
        </div>
    </Router>
  );
}

export default App;
