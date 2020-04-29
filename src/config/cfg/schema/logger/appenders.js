// Define a schema
const schema = {
  appenders: {
    stdout: {
      doc: "logger.appenders.stdout",
      format: Boolean,
      default: false, //false,
    },
    stderr: {
      doc: "logger.appenders.stderr",
      format: Boolean,
      default: false, //false,
    },
    gelf: {
      doc: "logger.appenders.gelf",
      format: Boolean,
      default: false, //false,
    },
    file: {
      doc: "logger.appenders.file",
      format: Boolean,
      default: true, //false,
    },
  },
};

module.exports = schema;
