// @flow

import request from 'request-promise';

import readConf from '../helpers/auth';

const BASE_URL = 'https://api.sendpulse.com';

async function takeRequest(partUrl, payload, method, token) {
  const options = {
    method: method || 'POST',
    headers: { 'content-type': 'application/json' },
    url: `${BASE_URL}/${partUrl}`,
    body: JSON.stringify(payload),
  };

  if (token) options.headers.Authorization = token;

  return JSON.parse(await request(options));
}

function checkExpires(req) {
  if (!req.app.locals.auth) return false;

  const localExpires = req.app.locals.auth.expires;
  const currentUnixEpoch = Math.round(Date.now() / 1000);

  if (localExpires <= (currentUnixEpoch - 15)) return false;

  return true;
}

export async function getToken(req: Object) {
  if (!req || !req.app) throw new Error('req is required parameter');
  if (checkExpires(req)) return req.app.locals.auth.token;

  const conf = readConf();
  const partUrl = 'oauth/access_token';
  const payload = {
    grant_type: 'client_credentials',
    client_id: conf.key,
    client_secret: conf.secret,
  };
  const credentials = await takeRequest(partUrl, payload);

  req.app.locals.auth = {
    token: `${credentials.token_type} ${credentials.access_token}`,
    expires: Math.round(Date.now() / 1000) + credentials.expires_in,
  };

  return req.app.locals.auth.token;
}

export async function sendMsg(token, text, subject) {
  const partUrl = 'smtp/emails';
  // Buffer.from(text, 'base64').toString()
  const payload = {
    email: JSON.stringify({
      html: 'dGVzdA==',
      text: '',
      subject: 'subject test',
      from: { name: 'NAME', email: 'from@domain.com' },
      to: [{ email: 'to@domain.com' }],
    }),
  };

  console.error(payload);

  const result = await takeRequest(partUrl, payload, 'POST', token);
  return result;
}
