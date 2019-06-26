import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    GET_LOCATION_START,
    GET_LOCATION_SUCCESS,
    GET_LOCATION_FAILURE, 
    LOGOUT, 
    NEW_USER_START,
    NEW_USER_SUCCESS,
    NEW_USER_FAILURE
  } from '../actions';
  
  const initialState = {
    error: '',
    fetchingData: false,
    loggingIn: false,
    loggedIn: false,
    message: '',
    friends: [],
    traffic: [],
    gettingLocation: true,
    location: {
      latitude: 0,
      longitude: 0
    }

  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_LOCATION_START:
        return {
          ...state,
          gettingLocation: true
        };

      case GET_LOCATION_SUCCESS:
        console.log(action.payload)
        return {
          ...state,
          gettingLocation: false,
          location: {longitude: action.payload.longitude, latitude: action.payload.latitude}
        };

      case LOGIN_START:
        return {
          ...state,
          error: '',
          loggingIn: true
        };
      case LOGIN_SUCCESS:
        console.log(action.payload)
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('message', action.payload.message);
        return {
          ...state,
          loggingIn: false,
          error: '', 
          message: localStorage.getItem('message'),
          loggedIn: true
        };

      case NEW_USER_START:
        return {
          ...state,
          error: '',
          loggingIn: true
        };

      case NEW_USER_SUCCESS:
        console.log(action.payload)
        return {
          ...state,
          loggingIn: false,
          error: '', 

        };

      case LOGOUT:
          localStorage.removeItem('token');
          localStorage.removeItem('message');
        return {
          ...state,
          loggedIn: false
        };

      case FETCH_DATA_START:
        return {
          ...state,
          error: '',
          fetchingData: true
        };
      case FETCH_DATA_SUCCESS:
          console.log(action.payload)
        return {
          ...state,
          fetchingData: false,
          traffic: action.payload
        };
      case FETCH_DATA_FAILURE:
        return {
          ...state,
          fetchingData: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  