const fs = require('fs');
const path = require('path');
const convict = require('convict');
global.Promise = require('bluebird');
const schema = require('./schema');
const formats = require('./formats');


// Define a custom formats
convict.addFormats(formats);

// Define a schema
const cfg = convict(schema);

// Load environment dependent configuration
const env = cfg.get('env');

// Normalize a port into a number, string, or false.
//cfg.set('server.http.port', normalizePort(cfg.get('server.http.port')));
//cfg.set('server.https.port', normalizePort(cfg.get('server.https.port')));

const dataDirPath = path.resolve(__dirname, '../../../', cfg.get('data.dir'));
const loggerFileDirPath = path.resolve(dataDirPath, cfg.get('logger.file.dir'));
if (!fs.existsSync(dataDirPath)) {
  fs.mkdirSync(dataDirPath, {
    recursive: true, // Default: false.
    mode: 0o777,     // Not supported on Windows. Default: 0o777.
  });
  // init data dir

}
fs.mkdirSync(path.resolve(dataDirPath, 'logs'), { recursive: true, mode: 0o777, });

if (env !== 'production') {
  cfg.set('config.file.name', env + '-' + cfg.get('config.file.name'));
  cfg.set('logger.file.name', env + '-' + cfg.get('logger.file.name'));
}

const configFileName = cfg.get('config.file.name');
const configFilePath = path.resolve(dataDirPath, configFileName);
if (fs.existsSync(configFilePath))
  cfg.loadFile(configFilePath);

if (cfg.get('config.file.save')) {
  cfg.set('config.file.save', false);
  cfg.set('config.file.print', false);

  fs.writeFileSync(
    configFilePath,
    cfg.toString(),
    {
      encoding: 'utf8', // Default: 'utf8'
      mode: 0o777,      // Default: 0o666
      flag: 'w',        // See support of file system flags. Default: 'w'.
    }
  );
  process.exit();
}

if (cfg.get('config.file.print')) {
  cfg.set('config.file.save', false);
  cfg.set('config.file.print', false);

  console.log(cfg.toString());
  process.exit();
}

cfg.set('data.dir', dataDirPath);
cfg.set('logger.file.dir', loggerFileDirPath);

// Perform validation
cfg.validate({ allowed: 'strict' });

module.exports = cfg;

/*
// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
*/
