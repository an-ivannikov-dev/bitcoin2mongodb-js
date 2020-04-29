const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('WalletInfoSchema');


const WalletInfoObj = {
  walletname: '',
  walletversion: 169900,
  balance: 299.9998216,
  unconfirmed_balance: 0,
  immature_balance: 5000,
  txcount: 110,
  keypoololdest: 1585458730,
  keypoolsize: 1000,
  keypoolsize_hd_internal: 1000,
  paytxfee: 0,
  hdseedid: '8b9b4a4c4d3383fe6523d30b41f6f41cefad8e3d',
  private_keys_enabled: true,
  avoid_reuse: false,
  scanning: false,
}
const WalletInfoSchema = new Schema({
  tag: {
    type: String, required: true,
    lowercase: true, trim: true,
    index: true, sparse: true, enum: ["latest"],
  },

  walletname: {
    type: String, required: true,
    lowercase: true, trim: true,
    index: true, unique: true,
  },
  walletversion: { type: Number, },
  balance: { type: Number, }, // !?! конвертация в сатоши?
  unconfirmed_balance: { type: Number, }, // !?! конвертация в сатоши?
  immature_balance: { type: Number, }, // !?! конвертация в сатоши?
  txcount: { type: Number, },
  keypoololdest: { type: Number, },
  keypoolsize: { type: Number, },
  keypoolsize_hd_internal: { type: Number, },
  paytxfee: { type: Number, }, // !?! конвертация в сатоши?
  hdseedid: {
    type: String, required: true,
    lowercase: true, trim: true,
    index: true, unique: true,
  },
  private_keys_enabled: { type: Boolean, },
  avoid_reuse: { type: Boolean, },
  scanning: { type: Boolean, },
}, {
  versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

const WalletInfo = mongoose.model('WalletInfo', WalletInfoSchema);

module.exports = WalletInfo;
module.exports.WalletInfoSchema = WalletInfoSchema;
