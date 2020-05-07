// Define a schema
const schema = {
  zmq: {
    host: {
      doc: "bitcoin zmq host or ip address",
      format: "*",
      default: "127.0.0.1", // localhost // 127.0.0.1 // 0.0.0.0
      env: "BITCOIN_ZMQ_HOST",
      arg: "bitcoin-zmq-host",
    },
    port: {
      doc: "bitcoin zmq port",
      format: "port",
      default: 28332,
      env: "BITCOIN_ZMQ_PORT",
      arg: "bitcoin-zmq-port",
    },
    subscriptions: {
      doc: "bitcoin zmq subscriptions",
      format: Array,
      default: [], // ["hashblock", "hashtx", "rawblock", "rawtx"],
      env: "BITCOIN_ZMQ_SUBSCRIPTIONS",
      arg: "bitcoin-zmq-subscriptions",
    },
  }
};

module.exports = schema;

/* ZeroMQ
Subscribe to receive messages for a specific topic.
This can be "rawblock", "hashblock", "rawtx", or "hashtx".
"rawblock" - Receive raw block data for new blocks.
"hashblock" - Receive only the block hash for new blocks.
"rawtx" - Receive raw transaction data for new transactions.
"hashtx" - Receive only the transaction hash for new transactions.
*/

/*

# ZeroMQ notification options:

#   zmqpubhashblock=<address>
#       Enable publish hash block in <address>

#   zmqpubhashblockhwm=<n>
#       Set publish hash block outbound message high water mark (default: 1000)

#   zmqpubhashtx=<address>
#       Enable publish hash transaction in <address>

#   zmqpubhashtxhwm=<n>
#       Set publish hash transaction outbound message high water mark (default:
#       1000)

#   zmqpubrawblock=<address>
#       Enable publish raw block in <address>

#   zmqpubrawblockhwm=<n>
#       Set publish raw block outbound message high water mark (default: 1000)

#   zmqpubrawtx=<address>
#       Enable publish raw transaction in <address>
*/
