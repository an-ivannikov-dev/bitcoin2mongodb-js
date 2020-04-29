const isProduction = process.env.NODE_ENV === 'production';


// Update blocks/block_state with latest via block number so that duplicates are overwritten.
// mongodb-update-via-block-num = false

// Enables storing blocks in mongodb.
// mongodb-store-blocks = true

// Enables storing block state in mongodb.
// mongodb-store-block-states = true

// Enables storing transactions in mongodb.
// mongodb-store-transactions = true

// Enables storing transaction traces in mongodb.
// mongodb-store-transaction-traces = true

// Enables storing action traces in mongodb.
// mongodb-store-action-traces = true

// Enables expiring data in mongodb after a specified number of seconds.
// mongodb-expire-after-seconds = 0
// 60*60*24*7=604800

// Track actions which match receiver:action:actor. Receiver, Action, & Actor may be blank to include all. i.e. leopays:: or :transfer:  Use * or leave unspecified to include all.
// mongodb-filter-on = 

// Do not track actions which match receiver:action:actor. Receiver, Action, & Actor may be blank to exclude all.
// mongodb-filter-out = 

// Define a schema
const schema = {
  mongodb: {
    uri: {
      doc: "mongodb uri",
      format: String,
      default: undefined,
      env: "MONGODB_URI",
      arg: "mongodb-uri",
    },
    debug: {
      doc: "mongodb debug",
      format: Boolean,
      default: !isProduction,
      env: "MONGODB_DEBUG",
      arg: "mongodb-debug",
    },
    wipe: {
      doc: "Deletes the given database, including all collections, documents, and indexes.",
      format: Boolean,
      default: false,
      env: "MONGODB_WIPE",
      arg: "mongodb-wipe",
    },
    block_start: {
      doc: "If specified then only abi data pushed to mongodb until specified block is reached.",
      format: Number,
      default: 0,
      env: "MONGODB_BLOCK_START",
      arg: "mongodb-block-start",
    },
    auth: {
      user: {
        doc: "mongodb auth username",
        format: String,
        default: undefined,
        env: "MONGODB_AUTH_USER",
        arg: "mongodb-auth-user",
      },
      pass: {
        doc: "mongodb auth password",
        format: String,
        default: undefined,
        env: "MONGODB_AUTH_PASS",
        arg: "mongodb-auth-pass",
      },
    },
    server: {
      host: {
        doc: "mongodb server host or ip address",
        format: "*",
        default: "127.0.0.1", // localhost:27017 // 127.0.0.1:27017
        env: "MONGODB_HOST",
        arg: "mongodb-host",
      },
      port: {
        doc: "mongodb server port",
        format: "port",
        default: 27017, // 27017
        env: "MONGODB_PORT",
        arg: "mongodb-port",
      },
    },
    db: {
      name: {
        doc: "mongodb db name",
        format: String,
        default: "BTC",
        env: "MONGODB_DBNAME",
        arg: "mongodb-dbname",
      },
    },
    options: {
      bufferCommands: {
        doc: "mongodb options: bufferCommands",
        format: Boolean,
        default: true,
      },
      useNewUrlParser: {
        doc: "mongodb options: useNewUrlParser",
        format: Boolean,
        default: true,
      },
      autoIndex: {
        doc: "mongodb options: autoIndex",
        format: Boolean,
        default: !isProduction,
      },
      autoReconnect: {
        doc: "mongodb options: autoReconnect",
        format: Boolean,
        default: true,
      },
      reconnectTries: {
        doc: "mongodb options: reconnectTries",
        format: Number,
        default: undefined, //Number.MAX_VALUE, // Never stop trying to reconnect
      },
      reconnectInterval: {
        doc: "mongodb options: reconnectTries",
        format: Number,
        default: undefined, //30000, // Reconnect every 30000ms
      },
    }
  }
};

module.exports = schema;
