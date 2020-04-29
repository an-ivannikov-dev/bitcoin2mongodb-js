const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('TransactionDetailSchema');


const TransactionDetailSchema = new Schema({
  address: { type: String, ref: 'Address', trim: true, index: true, },
  label: { type: String, trim: true, index: true, }, //"address_1",
  category: { type: String, trim: true, }, // enum: ["immature", "send", "receive"], 
  amount: { type: Number, }, // 25.0001564, // !?! перекорвертация в сатоши
  fee: { type: Number, }, // -0.0000336, // !?! переконвертация в сатоши?
  vout: { type: Number, }, // 0,
  // сюда нужно вставлять txid
  abandoned: { type: Boolean, }, // false,
}, {
  versionKey: false, createdAt: false, updatedAt: false,
});

TransactionDetailSchema.pre('save', async function (next) {
  log.debug('pre "save": "{"doc":%s}"', JSON.stringify(this));
  return next();
});

const TransactionDetail = mongoose.model('TransactionDetail', TransactionDetailSchema);

module.exports = TransactionDetail;
module.exports.TransactionDetailSchema = TransactionDetailSchema;
