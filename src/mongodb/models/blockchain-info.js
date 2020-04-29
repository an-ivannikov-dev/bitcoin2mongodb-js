const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('BlockchainInfoSchema');

const BlockchainInfoObj = {
  chain: 'regtest',
  blocks: 106,
  headers: 106,
  bestblockhash: '1921c2eb4208e9fc95f6df5a634997105e4cd7512c4d2b82e9369c4c37cdf0f8',
  difficulty: 4.656542373906925e-10,
  mediantime: 1585572376,
  verificationprogress: 1,
  initialblockdownload: true,
  chainwork: '00000000000000000000000000000000000000000000000000000000000000d6',
  size_on_disk: 32289,
  pruned: false,
  softforks: {
    bip34: { type: 'buried', active: false, height: 500 },
    bip66: { type: 'buried', active: false, height: 1251 },
    bip65: { type: 'buried', active: false, height: 1351 },
    csv: { type: 'buried', active: false, height: 432 },
    segwit: { type: 'buried', active: true, height: 0 },
    testdummy: { type: 'bip9', bip9: [Object], active: false }
  },
  warnings: '',
}
const BlockchainInfoSchema = new Schema({
  tag: {
    type: String, required: true,
    lowercase: true, trim: true,
    index: true, sparse: true, enum: ["latest"],
  },

  chain: {
    type: String, required: true,
    lowercase: true, trim: true,
    index: true, unique: true,
  },
  blocks: { type: Number, },
  headers: { type: Number, },
  bestblockhash: { type: String, lowercase: true, trim: true, },
  difficulty: { type: Number, },
  mediantime: { type: Number, },
  verificationprogress: { type: Number, },
  initialblockdownload: { type: Boolean, },
  chainwork: { type: String, lowercase: true, trim: true, },
  size_on_disk: { type: Number, },
  pruned: { type: Boolean, },
  softforks: { type: Schema.Types.Mixed },
  warnings: { type: String, trim: true, },
}, {
  versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

const BlockchainInfo = mongoose.model('BlockchainInfo', BlockchainInfoSchema);

module.exports = BlockchainInfo;
module.exports.BlockchainInfoSchema = BlockchainInfoSchema;
