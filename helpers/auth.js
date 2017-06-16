import conf from '../configs/auth.json';

function readConf(token) {
  if (token) {
    return conf.token;
  }

  return conf;
}

export default readConf;
