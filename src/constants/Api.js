import axios from 'axios';

import * as config from './Config';

export default axios.create({
  baseURL: `${config.API_URL}`
});
