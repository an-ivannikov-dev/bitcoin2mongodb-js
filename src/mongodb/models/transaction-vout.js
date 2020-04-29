const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('TransactionVOutSchema');


const TransactionVOutSchema = new Schema({
  // _id = `${txid}-${vout}
  _id: { type: String, required: true, lowercase: true, trim: true, index: true, unique: true, },
  txid: { type: String, required: true, lowercase: true, trim: true, index: true, },

  n: { type: Number, }, // 0,
  value: { type: Number, }, // 25.0001564, // !?! перекорвертация в сатоши
  scriptPubKey: {
    asm: { type: String, trim: true, },//"OP_DUP OP_HASH160 8729888fd4da44fdc1e313f7059c76bc3de176dc OP_EQUALVERIFY OP_CHECKSIG",
    hex: { type: String, lowercase: true, trim: true, }, //"76a9148729888fd4da44fdc1e313f7059c76bc3de176dc88ac",
    reqSigs: { type: Number, }, // 1,
    type: { type: String, lowercase: true, trim: true, index: true, }, // enum: ["nulldata", "pubkeyhash", "scripthash"],
    addresses: [
      { type: String, ref: 'Address', trim: true, index: true, },
    ],
  },
}, {
  versionKey: false, createdAt: false, updatedAt: false,
});

//TransactionVOutSchema.index({ txid: 1, n: 1 });

TransactionVOutSchema.pre('save', async function (next) {
  log.debug('pre "save": "{"doc":%s}"', JSON.stringify(this));
  if (this._id === undefined)
    this._id = `${this.txid}-${this.n}`;
  return next();
});

const TransactionVOut = mongoose.model('TransactionVOut', TransactionVOutSchema);

module.exports = TransactionVOut;
module.exports.TransactionVOutSchema = TransactionVOutSchema;
