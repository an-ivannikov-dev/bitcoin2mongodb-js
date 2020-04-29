const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('TransactionVInSchema');


const TransactionVInSchema = new Schema({
  // coinbase
  coinbase: { type: String, lowercase: true, trim: true, },
  sequence: { type: Number, },
  // coinbase end

  // это данные из предыдущей транзакции
  txid: { type: String, lowercase: true, trim: true, index: true, },
  vout: { type: Number, }, // 0,
  scriptSig: {
    asm: { type: String, lowercase: true, trim: true, index: true, }, // "00147671c492478fff82c9f0b1c91871b31e7648aca7",
    hex: { type: String, lowercase: true, trim: true, index: true, }, // "1600147671c492478fff82c9f0b1c91871b31e7648aca7"
  },
  txinwitness: [{ type: String, lowercase: true, trim: true, }],
  sequence: { type: Number, }, // 4294967294

}, {
  versionKey: false, createdAt: false, updatedAt: false,
});

//TransactionVInSchema.index({ txid: 1, vout: 1 });

TransactionVInSchema.pre('save', async function (next) {
  log.debug('pre "save": "{"doc":%s}"', JSON.stringify(this));
  return next();
});

const TransactionVIn = mongoose.model('TransactionVIn', TransactionVInSchema);

module.exports = TransactionVIn;
module.exports.TransactionVInSchema = TransactionVInSchema;
