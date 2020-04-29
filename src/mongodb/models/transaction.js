const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('TransactionSchema');
const { TransactionDetailSchema } = require('./transaction-detail');
const { TransactionDecodedSchema } = require('./transaction-decoded');



const TransactionObj = {
  "amount": 0,
  "fee": -0.0000336,
  "confirmations": 1,
  "blockhash": "0d0c9f534a633f12cc77b7f48bed5fbaa27699a56e4ba269561a60a80db5f8e7",
  "blockindex": 1,
  "blocktime": 1585982642,
  "txid": "5523ccbebe5413fc088f10bc18a74f9d23acffcc22a90798936f2ea8d8161578",
  "walletconflicts": [],
  "time": 1585982571,
  "timereceived": 1585982571,
  "bip125-replaceable": "no",
  "details": [
    {
      "address": "msqdGkBy9RG8W5dJrUCDfVTTT5crE2XkB2",
      "category": "send",
      "amount": -1,
      "label": "address_1",
      "vout": 1,
      "fee": -0.0000336,
      "abandoned": false
    },
    {
      "address": "msqdGkBy9RG8W5dJrUCDfVTTT5crE2XkB2",
      "category": "receive",
      "amount": 1,
      "label": "address_1",
      "vout": 1
    }
  ],
  "hex": "020000000001017153b2fd09a8cc4627768fcba24f26f55056b5492e317bd26b3153c7b51d219500000000171600147671c492478fff82c9f0b1c91871b31e7648aca7feffffff02542324180100000017a914bb765708201ea23e764496cc20a381745c3456408700e1f505000000001976a9148729888fd4da44fdc1e313f7059c76bc3de176dc88ac0247304402204920a74af1ebb02a6c2fb451b388208dd020c6e874c6fdf719222c5da8a96195022041010b5d296188c0ed0d6152d068e9c0826725603f181de0e370f98357f9f186012102897c2d69680246c145ed733b486e97e51dbc555350fa5201c1925d1675b915d6b4000000",
  "decoded": {
    "txid": "5523ccbebe5413fc088f10bc18a74f9d23acffcc22a90798936f2ea8d8161578",
    "hash": "09a76c8947bc3c537cd7b12423a6b6400c677e1549a6b8b0b64efe7b9c43ade3",
    "version": 2,
    "size": 249,
    "vsize": 168,
    "weight": 669,
    "locktime": 180,
    "vin": [
      {
        "txid": "95211db5c753316bd27b312e49b55650f5264fa2cb8f762746cca809fdb25371",
        "vout": 0,
        "scriptSig": {
          "asm": "00147671c492478fff82c9f0b1c91871b31e7648aca7",
          "hex": "1600147671c492478fff82c9f0b1c91871b31e7648aca7"
        },
        "txinwitness": [
          "304402204920a74af1ebb02a6c2fb451b388208dd020c6e874c6fdf719222c5da8a96195022041010b5d296188c0ed0d6152d068e9c0826725603f181de0e370f98357f9f18601",
          "02897c2d69680246c145ed733b486e97e51dbc555350fa5201c1925d1675b915d6"
        ],
        "sequence": 4294967294
      }
    ],
    "vout": [
      {
        "value": 46.9998882,
        "n": 0,
        "scriptPubKey": {
          "asm": "OP_HASH160 bb765708201ea23e764496cc20a381745c345640 OP_EQUAL",
          "hex": "a914bb765708201ea23e764496cc20a381745c34564087",
          "reqSigs": 1,
          "type": "scripthash",
          "addresses": [
            "2NALS7ZWdHEim6dJsjf7ZBWzfsLJ92BU165"
          ]
        }
      },
      {
        "value": 1,
        "n": 1,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 8729888fd4da44fdc1e313f7059c76bc3de176dc OP_EQUALVERIFY OP_CHECKSIG",
          "hex": "76a9148729888fd4da44fdc1e313f7059c76bc3de176dc88ac",
          "reqSigs": 1,
          "type": "pubkeyhash",
          "addresses": [
            "msqdGkBy9RG8W5dJrUCDfVTTT5crE2XkB2"
          ]
        }
      }
    ]
  }
};

const TransactionSchema = new Schema({
  // _id === txid
  _id: { type: String, required: true, lowercase: true, trim: true, index: true, unique: true, },
  txid: { type: String, required: true, lowercase: true, trim: true, index: true, unique: true, },

  blockhash: { type: String, required: true, lowercase: true, trim: true, index: true, }, //?Buffer
  //blockheight:
  amount: { type: Number, }, // 0, // !?! переконвертация в сатоши?
  fee: { type: Number, }, // -0.0000336, // !?! переконвертация в сатоши?
  //confirmations: { type: Number, },
  generated: { type: Boolean, },
  blockindex: { type: Number, }, // 0
  blocktime: { type: Number, }, // 1585982642,
  walletconflicts: { type: Schema.Types.Mixed }, // [],
  time: { type: Number, }, // 1585982642,
  timereceived: { type: Number, }, // 1585982642,
  "bip125-replaceable": { type: String, lowercase: true, trim: true, }, // "no",
  details: [{ type: TransactionDetailSchema }],
  hex: { type: String, lowercase: true, trim: true, }, // ...
  decoded: { type: TransactionDecodedSchema, },
}, {
  versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});


TransactionSchema.pre('save', async function (next) {
  log.debug('pre "save": "{"doc":%s}"', JSON.stringify(this));
  if (this._id === undefined)
    this._id = this.txid;
  return next();
});

TransactionSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const options = this.getOptions();
  const update = this.getUpdate();
  log.debug(
    `pre 'findOneAndUpdate': "{"query":%s,"options":%s,"update":%s}"`,
    JSON.stringify(query), JSON.stringify(options), JSON.stringify(update)
  );

  // _id
  update._id = update.txid;

  // vout
  {
    let vout = [];
    for (let i in update.decoded.vout) {
      vout.push(Object.assign({},
        { _id: `${update.txid}-${update.decoded.vout[i].n}`, txid: update.txid },
        update.decoded.vout[i],
      ));
    }
    update.decoded.vout = vout;
  }

  const doc = await this.model.findOne(query);
  if (doc === null) {
    // details
    let details = []
    for (let i in update.details) {
      const result = await mongoose.model('Address')
        .findByIdAndUpdate(
          { _id: update.decoded.vout[i].address },
          {
            address: update.decoded.vout[i].address,
            label: update.decoded.vout[i].label,
          },
          { new: true, upsert: true, }
        );
      vouts.push(result);
    }
    let vouts = [];
    for (let i in update.decoded.vout) {
      const result = await mongoose.model('TransactionVOut')
        .findByIdAndUpdate(
          update.decoded.vout[i]._id,
          update.decoded.vout[i],
          { new: true, upsert: true, }
        );
      vouts.push(result);
    }
    await new this.model(
      Object.assign({},
        { settings: { user_id: update.id } },
        update,
      )
    ).save();
  }

  return next();
});


const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
module.exports.TransactionSchema = TransactionSchema;
