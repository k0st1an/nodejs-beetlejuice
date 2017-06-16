import _ from 'lodash';
import urls from '../routes/urls';

function getValue(keys: Array) {
  let volume = urls;

  for (let i = 0; i < keys.length; i += 1) {
    volume = volume[keys[i]];
  }

  return volume;
}

function getUrl(name: string, value: string | Number, id: string) {
  const keys = name.split('.');

  if (value) {
    return _.replace(getValue(keys), id || ':id', value);
  }

  return getValue(keys);
}

export default getUrl;
