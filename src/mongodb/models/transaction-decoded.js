const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('TransactionDecodedSchema');
const { TransactionVInSchema } = require('./transaction-vin');
const { TransactionVOutSchema } = require('./transaction-vout');



const TransactionDecodedSchema = new Schema({
  txid: { type: String, required: true, lowercase: true, trim: true, index: true, },
  hash: { type: String, required: true, lowercase: true, trim: true, index: true, },
  version: { type: Number, }, // 2,
  size: { type: Number, }, // 173,
  vsize: { type: Number, }, // 146,
  weight: { type: Number, }, // 584,
  locktime: { type: Number, }, // 0,
  vin: [{ type: TransactionVInSchema }],
  vout: [{ type: TransactionVOutSchema }],
}, {
  versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

TransactionDecodedSchema.pre('save', async function (next) {
  log.debug('pre "save": "{"doc":%s}"', JSON.stringify(this));
  return next();
});

const TransactionDecoded = mongoose.model('TransactionDecoded', TransactionDecodedSchema);

module.exports = TransactionDecoded;
module.exports.TransactionDecodedSchema = TransactionDecodedSchema;
