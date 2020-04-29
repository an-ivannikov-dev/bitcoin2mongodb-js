const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('BlockSchema');


const BlockObj = {
  "hash": "144e56525ed54a8cc06de8e874814b4de6f24f81fee84a5745da8516b455e768",
  "confirmations": 1,
  "strippedsize": 216,
  "size": 252,
  "weight": 900,
  "height": 6,
  "version": 536870912,
  "versionHex": "20000000",
  "merkleroot": "8f80bf6bdd1c8958d83c4d2f89e200794ac2ea826f3cbf8e242859e0b3d1e229",
  "tx": [
    "8f80bf6bdd1c8958d83c4d2f89e200794ac2ea826f3cbf8e242859e0b3d1e229"
  ],
  "time": 1585508013,
  "mediantime": 1585507899,
  "nonce": 0,
  "bits": "207fffff",
  "difficulty": 4.656542373906925e-10,
  "chainwork": "000000000000000000000000000000000000000000000000000000000000000e",
  "nTx": 1,
  "previousblockhash": "4d8cc335ecb0e083ff1c320217cc19b9c78d804ecb44d684c5e3b6ac1afa2735",
}
const BlockSchema = new Schema({
  hash: { type: String, required: true, lowercase: true, trim: true, index: true, unique: true, }, //?Buffer //hash //"144e56525ed54a8cc06de8e874814b4de6f24f81fee84a5745da8516b455e768"
  //confirmations: { type: Number, }, // 1,// !?! обавляется как? и зачем?
  strippedsize: { type: Number, }, // 216,
  size: { type: Number, }, // 252,
  weight: { type: Number, }, // 900,
  height: { type: Number, index: true, }, // 6,
  version: { type: Number, }, // 536870912,
  versionHex: { type: String, lowercase: true, trim: true, }, // "20000000",
  merkleroot: { type: String, lowercase: true, trim: true, }, // hash //"8f80bf6bdd1c8958d83c4d2f89e200794ac2ea826f3cbf8e242859e0b3d1e229"
  tx: [{ type: String, required: true, lowercase: true, trim: true, }], //["8f80bf6bdd1c8958d83c4d2f89e200794ac2ea826f3cbf8e242859e0b3d1e229"]
  time: { type: Number, }, // 1585508013 -> new Date(1585508013*1000)
  mediantime: { type: Number, }, // 1585507899
  nonce: { type: Number, }, // 0
  bits: { type: String, required: true, lowercase: true, trim: true, }, // "17143b41" //?Buffer 
  difficulty: { type: Number, },  //4.656542373906925e-10, // ? mongoose.Types.Decimal128
  chainwork: { type: String, lowercase: true, trim: true, }, // ? hash //"000000000000000000000000000000000000000000000000000000000000000e"
  nTx: { type: Number, }, // 2185,
  previousblockhash: { type: String, lowercase: true, trim: true, index: true, }, //hash
  // ? nextblockhash устанавливается тем следующим блоком, 
  // но цепь может ветвиться и несколько блоков могут быть следующими относительно этого
  //nextblockhash: { type: String, lowercase: true, trim: true, }, //hash

  //verified: { type: Boolean, },
}, {
  versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

const Block = mongoose.model('Block', BlockSchema);

module.exports = Block;
module.exports.BlockSchema = BlockSchema;
