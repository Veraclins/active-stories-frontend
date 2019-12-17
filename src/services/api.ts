import axios from 'axios';
import config from 'config';

const instance = axios.create({
  baseURL: config.BASE_URL,
  method: 'GET',
});

instance.interceptors.response.use(
  response => {
    console.log(response);
    const { data } = response;
    if (typeof data === 'string' && data.charAt(0) === '{') {
      response.data = eval(`( ${data} )`);
    }
    return response;
  },
  error => {
    const formatedError = error.response ? error.response : error;
    // if (formatedError.data.error === 'TokenExpiredError: jwt expired') {
    // }
    throw formatedError;
  }
);

export default instance;
