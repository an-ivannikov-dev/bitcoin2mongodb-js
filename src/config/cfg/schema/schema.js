const env = require('./env');
const data = require('./data');
const config = require('./config');
const logger = require('./logger');
const bitcoin = require('./bitcoin');
const mongodb = require('./mongodb');
const symbol = require('./symbol');


// Define a schema
const schema = Object.assign(
  {},
  { /* */ },
  env,
  data,
  config,
  logger,
  bitcoin,
  mongodb,
  symbol,
);

module.exports = schema;
