import axios from 'axios';

import * as config from './Config';

export default function callApi(url, method, params = null) {
  if (method === 'PUT') {
    console.log(params);
    return axios.put(url + config.FORMAT, params).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  return axios({
    method: method,
    url: url + config.FORMAT,
    body: params
  }).catch((err) => {
    console.log(err);
  });
}
