const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('TxOutSetInfoSchema');


const TxOutSetInfoObj = {
  height: 106,
  bestblock: '1921c2eb4208e9fc95f6df5a634997105e4cd7512c4d2b82e9369c4c37cdf0f8',
  transactions: 106,
  txouts: 106,
  bogosize: 7950,
  hash_serialized_2: 'd72c54ce9412ba29d3d3474fa7e6de6217e64e39204c78fe0de002da3335b9bb',
  disk_size: 7571,
  total_amount: 5300,
}
const TxOutSetInfoSchema = new Schema({
  tag: {
    type: String, required: true,
    lowercase: true, trim: true,
    index: true, sparse: true, enum: ["latest"],
  },

  height: { type: Number, },
  bestblock: { type: String, lowercase: true, trim: true, },
  transactions: { type: Number, },
  txouts: { type: Number, },
  bogosize: { type: Number, },
  hash_serialized_2: { type: String, lowercase: true, trim: true, },
  disk_size: { type: Number, },
  total_amount: { type: Number, }, // !?! конвертация в сатоши?
}, {
  versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

const TxOutSetInfo = mongoose.model('TxOutSetInfo', TxOutSetInfoSchema);

module.exports = TxOutSetInfo;
module.exports.TxOutSetInfoSchema = TxOutSetInfoSchema;
