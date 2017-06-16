import isAuthentication from './auth';

const Middleware = app => {
  app.use(isAuthentication);
};

export default Middleware;
