const isProduction = process.env.NODE_ENV === 'production';

// Define a schema
const schema = {
  rpc: {
    protocol: {
      doc: "rpc protocol",
      format: ["http", "https"],
      default: "http",
      env: "BITCOIN_RPC_PROTOCOL",
      arg: "bitcoin-rpc-protocol",
    },
    host: {
      doc: "rpc host or ip address",
      format: "*",
      default: "127.0.0.1", // localhost // 127.0.0.1 // 0.0.0.0
      env: "BITCOIN_RPC_HOST",
      arg: "bitcoin-rpc-host",
    },
    port: {
      doc: "rpc port",
      format: "port",
      default: isProduction ? 8333 : 18443, // main: 8333, test: 18333, regtest: 18443
      env: "BITCOIN_RPC_PORT",
      arg: "bitcoin-rpc-port",
    },
    pathname: {
      doc: "rpc pathname",
      format: String,
      default: "/", // /wallet/<walletname>
      env: "BITCOIN_RPC_PATHNAME",
      arg: "bitcoin-rpc-pathname",
    },
    user: {
      doc: "rpc auth user",
      format: String,
      default: undefined,
      env: "BITCOIN_RPC_USER",
      arg: "bitcoin-rpc-user",
    },
    pass: {
      doc: "rpc auth password",
      format: String,
      default: undefined,
      env: "BITCOIN_RPC_PASSWORD",
      arg: "bitcoin-rpc-password",
    },
  }
};

module.exports = schema;
