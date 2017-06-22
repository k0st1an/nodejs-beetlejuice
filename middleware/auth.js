// @flow

import readConf from '../helpers/auth';

const isAuthentication = (req: Object, res: Object, next: Function) => {
  const token = req.get('Authorization');
  const definedToken = readConf(true);

  if (definedToken && token) {
    // Authorization: Token 1234 => 1234
    if (String(definedToken) === token.slice(6)) return next();
  }

  return res.status(401).json();
};

export default isAuthentication;
