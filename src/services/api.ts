import axios from 'axios';
import config from 'config';

const api = axios.create({
  baseURL: config.BASE_URL,
  method: 'GET',
});

api.interceptors.response.use(
  response => {
    const { data } = response;
    if (typeof data === 'string') {
      // the beeceptor api returns objects wrapped as a string
      if (data.charAt(0) === '{' || data.charAt(0) === '[') {
        response.data = eval(`( ${data} )`);
      } else {
        throw new Error(data);
      }
    }
    return response;
  },
  error => {
    const formatedError = error.response ? error.response : error;
    throw formatedError;
  }
);

export default api;
