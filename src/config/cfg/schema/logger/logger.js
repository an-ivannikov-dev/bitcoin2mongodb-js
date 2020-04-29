const appenders = require('./appenders');
const file = require('./file');
const gelf = require('./gelf');


// Define a schema
const schema = {
  logger: Object.assign(
    {},
    {
      level: {
        doc: "logger.level",
        format: ["fatal", "error", "warn", "info", "debug", "trace"],
        default: "info", //"info",
      },
    },
    appenders,
    file,
    gelf,
  ),
};

module.exports = schema;
