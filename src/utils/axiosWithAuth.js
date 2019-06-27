import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  // const token = 1234;

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: 'https://route-management-system.herokuapp.com/'
  });
};
