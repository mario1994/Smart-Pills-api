module.exports = {
  development: {
    client: 'postgres',
    connection:{
    host : '127.0.0.1',
    user : 'marioboban',
    password : '',
    database : 'smart-pills'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'postgres',
    connection:{
    host : '127.0.0.1',
    user : 'marioboban',
    password : '',
    database : 'smart-pills'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgres',
    connection:{
    host : '127.0.0.1',
    user : 'marioboban',
    password : '',
    database : 'smart-pills'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
};