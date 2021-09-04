import axios from 'axios';
const baseURL = 'http://localhost:8080';

const axiomInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export default class HTTPService {
  static post(url, body) {
    return new Promise((resolve, reject) => {
      axiomInstance
        .post(url, body)
        .then(response => {
          resolve(response.message);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
  static get(url) {
    return new Promise((resolve, reject) => {
      axiomInstance
        .get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
}
