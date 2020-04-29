const env = require('./env');
const data = require('./data');
const config = require('./config');
const logger = require('./logger');
const mongodb = require('./mongodb');
const rpc = require('./rpc');
const symbol = require('./symbol');


// Define a schema
const schema = Object.assign(
  {},
  { /* */ },
  env,
  rpc,
  data,
  config,
  logger,
  mongodb,
  symbol,
);

module.exports = schema;
