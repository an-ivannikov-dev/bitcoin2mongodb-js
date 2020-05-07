const rpc = require('./rpc');
const zmq = require('./zmq');


// Define a schema
const schema = {
  bitcoin: Object.assign(
    {},
    rpc,
    zmq,
  ),
};

module.exports = schema;
