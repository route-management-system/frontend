import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logout } from '../actions/'



class LogoutPage extends Component {
    constructor(props) {
        super(props)
      }
    
  componentWillMount() {
    this.props.logout();
    this.props.history.push('/')
  }

  render() {
    return null
  }
}

const mapStateToProps = ({ logout }) => ({
    logout
  });

export default withRouter(
    connect(
        mapStateToProps,
        { logout }
    )(LogoutPage))