import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import orange from '@material-ui/core/colors/orange';

const NavBar = props => {
  const [value, setValue] = React.useState(0);

  const primary = orange[600]

  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref}  {...props} />);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  
  
  return (
  <nav>
      <AppBar position="static" backgroundColor={primary}>
          <Tabs variant="fullWidth" onChange={handleChange} value={value}>
              <Tab 
                label="Home" 
                component={AdapterLink} 
                to="/" 
              />
              <Tab 
                label="My Saved Routes"
                component={AdapterLink}
                to={{pathname: "/protected",
                    title: 'My Saved Routes' }} 
              />
          </Tabs>
      </AppBar>
  </nav>  
  )

}

export default NavBar