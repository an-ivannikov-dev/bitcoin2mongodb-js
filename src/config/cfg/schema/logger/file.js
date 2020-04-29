// Define a schema
const schema = {
  file: {
    dir: {
      doc: "logger.file.dir",
      format: String,
      default: "./logs",
    },
    name: {
      doc: "logger.file.name",
      format: String,
      default: "./debug.log",
    },
    pattern: {
      doc: "logger.file.pattern",
      format: String,
      default: ".yyyy-MM-dd-hh",
    },
    keep_file_ext: {
      doc: "logger.file.keep_file_ext",
      format: Boolean,
      default: true, // - boolean (default false) - preserve the file extension when rotating log files (file.log becomes file.2017-05-30.log instead of file.log.2017-05-30).
    },
    encoding: {
      doc: "logger.file.encoding",
      format: String,
      default: "utf-8", // - string (default “utf-8”)
    },
    mode: {
      doc: "logger.file.mode",
      format: Number,
      default: 0o777, // - integer (default 0o644 - node.js file modes)
    },
    flags: {
      doc: "logger.file.flags",
      format: String,
      default: "a", // flags: 'a', // - string (default ‘a’)
    },
    compress: {
      doc: "logger.file.compress",
      format: Boolean,
      default: false, // - boolean (default false) - compress the backup files during rolling (backup files will have .gz extension)
    },
    always_include_pattern: {
      doc: "logger.file.always_include_pattern",
      format: Boolean,
      default: false, // - boolean (default false) - include the pattern in the name of the current log file as well as the backups.
    },
    days_to_keep: {
      doc: "logger.file.days_to_keep",
      format: Number,
      default: 1, // - integer (default 0) - if this value is greater than zero, then files older than that many days will be deleted during log rolling.
    }
  }
};

module.exports = schema;
