import { axiosWithAuth } from '../utils/axiosWithAuth';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const login = creds => dispatch => {
  console.log(creds)
  dispatch({ type: LOGIN_START, payload: creds.username });
  return axiosWithAuth()
    .post('/users/login', creds)
    .then(res => {
      console.log(res.data)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      return true;
    })
    .catch(err => console.log(err.response));
};

export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';

// export const getData = () => dispatch => {{ name, age, email }
  
export const addLocation = (postInfo) => dispatch => {
  // dispatch({ type: ADD_LOCATION });

  // dispatch({ type: ADD_LOCATION_SUCCESS, payload: res.data });

  axiosWithAuth()
    .post(`/saves`, postInfo)
    .then(res => {
      console.log(res.data)
      dispatch({ type: ADD_LOCATION_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_DATA_FAILURE, payload: err.response.data.error });
    });
};

export const GET_ID = 'GET_ID';
export const getID = token => dispatch => {
  axiosWithAuth()
    .get('/users', token)
    .then(res => {
      console.log(res.data)
      dispatch({ type: GET_ID, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_DATA_FAILURE, payload: err.response.data.error });
    });
};

export const NEW_USER_START = 'NEW_USER_START';
export const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS';
export const NEW_USER_FAILURE = 'NEW_USER_FAILURE';
export const newUser = creds => dispatch => {
  dispatch({ type: NEW_USER_START });
  return axiosWithAuth()
    .post('/users/register', creds)
    .then(res => {
      dispatch({ type: NEW_USER_SUCCESS, payload: res.data });
      return true;
    })
    .then(
      setTimeout(() => {dispatch(login(creds))}, 2000)
    )
    .catch(err => console.log(err.response));
};


export const LOGOUT = 'LOGOUT'
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const getData = (id) => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  axiosWithAuth()
    // .get(`/saves/${id}`)
    .get(`/saves/`)
    .then(res => {
      console.log(res)
      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_DATA_FAILURE, payload: err.response.data.error });
    });
};

export const GET_LOCATION_START = 'GET_LOCATION_START';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_FAILURE = 'GET_LOCATION_FAILURE';
export const getLocation = () => dispatch => {
  dispatch({ type: GET_LOCATION_START });
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition((position) => {
      dispatch({
          type: GET_LOCATION_SUCCESS,
          payload: position.coords
      }) });
};
