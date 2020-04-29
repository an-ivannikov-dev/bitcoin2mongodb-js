const mongoose = require('mongoose');
const cfg = require('../config');
const log4js = require('../logger');
const models = require('./models');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const log = log4js.getLogger('mongodb');

const getMongoose = (app = process) => {
  mongoose.set('debug', cfg.get('mongodb.debug'));

  //'connecting': Emitted when Mongoose starts making its initial connection to the MongoDB server
  mongoose.connection.on('connecting', () => {
    log.debug(`connection event 'connecting'.`);
    app.emit('MONGODB_CONNECTING');
  });

  //'connected': Emitted when Mongoose successfully makes its initial connection to the MongoDB server
  mongoose.connection.on('connected', () => {
    log.debug(`connection event 'connected'.`);
    app.emit('MONGODB_CONNECTED');
  });

  //'open': Equivalent to connected
  mongoose.connection.on('open', () => {
    log.debug(`connection event 'open'.`);
    app.emit('MONGODB_OPEN');
  });

  //'disconnecting': Your app called Connection#close() to disconnect from MongoDB
  mongoose.connection.on('disconnecting', () => {
    log.debug(`connection event 'disconnecting'.`);
    app.emit('MONGODB_DISCONNECTING');
  });

  //'disconnected': Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
  mongoose.connection.on('disconnected', () => {
    log.debug(`connection event 'disconnected'.`);
    app.emit('MONGODB_DISCONNECTED');
  });

  //'close': Emitted after Connection#close() successfully closes the connection. If you call conn.close(), you'll get both a 'disconnected' event and a 'close' event.
  mongoose.connection.on('close', () => {
    log.debug(`connection event 'close'.`);
    app.emit('MONGODB_CLOSE');
  });

  //'reconnected': Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected. Mongoose attempts to automatically reconnect when it loses connection to the database.
  mongoose.connection.on('reconnected', () => {
    log.debug(`connection event 'reconnected'.`);
    app.emit('MONGODB_RECONNECTED');
  });

  //'error': Emitted if an error occurs on a connection, like a parseError due to malformed data or a payload larger than 16MB.
  mongoose.connection.on('error', (error) => {
    log.debug(`connection event 'error'. error:`, error);
    app.emit('MONGODB_ERROR');
  });

  //'fullsetup': Emitted when you're connecting to a replica set and Mongoose has successfully connected to the primary and at least one secondary.
  mongoose.connection.on('fullsetup', () => {
    log.debug(`connection event 'fullsetup'.`);
    app.emit('MONGODB_FULLSETUP');
  });

  //'all': Emitted when you're connecting to a replica set and Mongoose has successfully connected to all servers specified in your connection string.
  mongoose.connection.on('all', () => {
    log.debug(`connection event 'all'.`);
    app.emit('MONGODB_ALL');
  });

  //'reconnectFailed': Emitted when you're connected to a standalone server and Mongoose has run out of reconnectTries. The MongoDB driver will no longer attempt to reconnect after this event is emitted. This event will never be emitted if you're connected to a replica set.
  mongoose.connection.on('reconnectFailed', () => {
    log.debug(`connection event 'reconnectFailed'.`);
    app.emit('MONGODB_RECONNECTFAILED');
  });
  return mongoose;
};

module.exports = getMongoose;

function getURI() {
  let uri = `mongodb://127.0.0.1:27017/BTC`;
  if (cfg.get('mongodb.uri') !== undefined) {
    uri = cfg.get('mongodb.uri');
  } else {
    const auth = (
      cfg.get('mongodb.auth.user') !== undefined &&
      cfg.get('mongodb.auth.pass') !== undefined
    )
      ? `${cfg.get('mongodb.auth.user')}:${cfg.get('mongodb.auth.pass')}@`
      : '';
    const server = `${cfg.get('mongodb.server.host')}:${cfg.get('mongodb.server.port')}`;
    const dbName = `${cfg.get('mongodb.db.name')}`;
    uri = `mongodb://${auth}${server}/${dbName}`;
  }
  return uri;
};
module.exports.getURI = getURI;

function getOptions() {
  //const options = { useUnifiedTopology: true };
  const options = {};
  options.user = (cfg.get('mongodb.auth') && cfg.get('mongodb.auth.user'))
    ? cfg.get('mongodb.auth.user')
    : undefined;
  options.pass = (cfg.get('mongodb.auth') && cfg.get('mongodb.auth.pass'))
    ? cfg.get('mongodb.auth.pass')
    : undefined;
  options.dbName = cfg.get('mongodb.db.name');
  options.useNewUrlParser = cfg.get('mongodb.options.useNewUrlParser');
  options.bufferCommands = cfg.get('mongodb.options.bufferCommands');
  options.autoIndex = cfg.get('mongodb.options.autoIndex');
  options.autoReconnect = cfg.get('mongodb.options.autoReconnect');
  options.reconnectTries = cfg.get('mongodb.options.reconnectTries')
    ? cfg.get('mongodb.options.reconnectTries')
    : Number.MAX_VALUE; // Never stop trying to reconnect
  options.reconnectInterval = cfg.get('mongodb.options.reconnectInterval')
    ? cfg.get('mongodb.options.reconnectInterval')
    : 30000; // Reconnect every 30000ms
  return options;
}
module.exports.getOptions = getOptions;

const connectDB = (uri) => {
  return new Promise((resolve, reject, onCancel) => {
    let mongoose = getMongoose();
    mongoose.set('debug', cfg.get('mongodb.debug'));
    if (uri === undefined) {
      uri = getURI();
      //const options = getOptions();
    }
    mongoose.connect(uri)
      .then((connection) => {
        log.debug('mongoose.connect was a success.');
      })
      .catch((error) => {
        log.error('mongoose.connect was a error:', error);
      })
      .finally(async () => {
        if (cfg.get('mongodb.wipe')) {
          // Deletes the entire database
          await mongoose.connection.dropDatabase();
        }
        resolve(mongoose.connection);
      });
  });
};
module.exports.connectDB = connectDB;
//module.exports.models = models;
