// Define a schema
const schema = {
  config: {
    file: {
      name: {
        doc: "Name of config file",
        format: String,
        default: "config.json",
        env: "CONFIG_FILE_NAME",
        arg: "config-file-name",
      },
      save: {
        doc: "Force save/rewrite config file (The Bot will be shutdown)",
        format: Boolean,
        default: false,
        env: "CONFIG_FILE_SAVE",
        arg: "config-file-save",
      },
      print: {
        doc: "Print config file to console (The Bot will be shutdown)",
        format: Boolean,
        default: false,
        env: "CONFIG_FILE_PRINT",
        arg: "config-file-print",
      },
    },
  },
};

module.exports = schema;
