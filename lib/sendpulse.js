import request from 'request-promise';
import readConf from '../helpers/auth';

const BASE_URL = 'https://api.sendpulse.com';

async function takeRequest(options) {
  return JSON.parse(await request(options));
}

function getToken() {
  const conf = readConf();
  const pathUrl = 'oauth/access_token';
  const payload = {
    grant_type: 'client_credentials',
    client_id: conf.key,
    client_secret: conf.secret,
  };

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    url: `${BASE_URL}/${pathUrl}`,
    body: JSON.stringify(payload),
  };

  return takeRequest(options);
}

export default getToken;
