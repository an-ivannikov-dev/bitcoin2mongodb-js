// Define a schema
const schema = {
  symbol: {
    name: {
      doc: "symbol name",
      format: String,
      default: "BTC",
    },
    decimals: {
      doc: "symbol decimals",
      format: Number,
      default: 8,
    },
  }
};

module.exports = schema;
