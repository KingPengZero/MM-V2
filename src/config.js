const env = {
  development: {
    serverApi: 'http://172.20.95.41:11504/meeting',
    isProduction: false
  },
  production: {
    serverApi: 'http://172.20.95.41:11504/meeting',
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const __host = '127.0.0.1';

module.exports = Object.assign({
  host: process.env.HOST || __host,
  port: 20000,
  app: {
    BaseName: '/tools/morningmeeting/',
    // BaseName: '/morningmeeting/',
    BuildPath: '/dist/moriningmeeting',
  }
}, env);
