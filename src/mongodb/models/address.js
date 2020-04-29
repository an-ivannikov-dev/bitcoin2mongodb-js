const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('AddressSchema');

const AddressObj =
{
  "address": "mjHZttBpMfmeWzBQNM1gsYZz1Xp5K9wwB1",
  "scriptPubKey": "76a914295865c0f472347d313e828d87c1a7408df6b91688ac",
  "ismine": true,
  "solvable": true,
  "desc": "pkh([a1d756ee/0'/0'/1']03526e2d56acdfd0fe00598a7ebf7e81738a30d09948375ac202531c25d9e873c9)#9hw3yw8l",
  "iswatchonly": false,
  "isscript": false,
  "iswitness": false,
  "pubkey": "03526e2d56acdfd0fe00598a7ebf7e81738a30d09948375ac202531c25d9e873c9",
  "iscompressed": true,
  "label": "address_2",
  "ischange": false,
  "timestamp": 1585824716,
  "hdkeypath": "m/0'/0'/1'",
  "hdseedid": "4d404f801d8da26038613fc97bc3c728ea531a91",
  "hdmasterfingerprint": "a1d756ee",
  "labels": [
    {
      "name": "address_2",
      "purpose": "receive"
    }
  ]
}

const AddressSchema = new Schema({
  // _id = address
  _id: { type: String, required: true, trim: true, index: true, unique: true, },

  address: { type: String, trim: true, index: true, unique: true, },
  scriptPubKey: { type: String, lowercase: true, trim: true, },
  ismine: { type: Boolean, },
  solvable: { type: Boolean, },
  desc: { type: String, trim: true, },
  iswatchonly: { type: Boolean, },
  isscript: { type: Boolean, },
  iswitness: { type: Boolean, },
  pubkey: { type: String, trim: true, },
  iscompressed: { type: Boolean, },
  label: { type: String, trim: true, index: true, },
  ischange: { type: Boolean, },
  timestamp: { type: Number, },
  hdkeypath: { type: String, trim: true, },
  hdseedid: { type: String, lowercase: true, trim: true, index: true, },
  hdmasterfingerprint: { type: String, lowercase: true, trim: true, },
  labels: [{
    name: { type: String, trim: true, },
    purpose: { type: String, trim: true, },//"receive"
  }],
}, {
  versionKey: false, createdAt: false, updatedAt: false,
});


AddressSchema.pre('save', async function (next) {
  log.debug('pre "save": "{"doc":%s}"', JSON.stringify(this));
  if (this._id === undefined)
    this._id = this.address;
  return next();
});


AddressSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const options = this.getOptions();
  const update = this.getUpdate();
  log.debug(
    `pre 'findOneAndUpdate': "{"query":%s,"options":%s,"update":%s}"`,
    JSON.stringify(query), JSON.stringify(options), JSON.stringify(update)
  );

  // _id
  update._id = update.address;

  const doc = await this.model.findOne(query);
  if (doc === null) {
    await new this.model(Object.assign({}, update)).save();
  }

  return next();
});


const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
module.exports.AddressSchema = AddressSchema;
