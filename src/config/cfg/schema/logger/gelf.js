const { hostname } = require('os');


// Define a schema
const schema = {
  gelf: {
    host: {
      doc: "logger gelf host",
      format: String,
      default: "localhost", // host - string(defaults to localhost) - the gelf server hostname
    },
    port: {
      doc: "logger gelf port",
      format: Number,
      default: 12201, //port - integer(defaults to 12201) - the port the gelf server is listening on
    },
    hostname: {
      doc: "logger gelf hostname",
      format: String,
      default: hostname(), // hostname - string(defaults to OS.hostname()) - the hostname used to identify the origin of the log messages.
    },
    facility: {
      doc: "logger gelf facility",
      format: String,
      default: "btc_watcher", // facility - string(optional)
    },
    customFields: {
      doc: "logger gelf customFields",
      format: Object,
      default: {}, // customFields: { '_something': 'yep' }, // customFields - object(optional) - fields to be added to each log message; custom fields must start with an underscore.
    },
  },
};

module.exports = schema;
