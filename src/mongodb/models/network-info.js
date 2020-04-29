const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger').getLogger('NetworkInfoSchema');


const NetworkInfoObj = {
  version: 190100,
  subversion: '/Satoshi:0.19.1/',
  protocolversion: 70015,
  localservices: '0000000000000409',
  localservicesnames: ['NETWORK', 'WITNESS', 'NETWORK_LIMITED'],
  localrelay: true,
  timeoffset: 0,
  networkactive: true,
  connections: 0,
  networks: [
    {
      name: 'ipv4',
      limited: false,
      reachable: true,
      proxy: '',
      proxy_randomize_credentials: false
    },
    {
      name: 'ipv6',
      limited: false,
      reachable: true,
      proxy: '',
      proxy_randomize_credentials: false
    },
    {
      name: 'onion',
      limited: true,
      reachable: false,
      proxy: '',
      proxy_randomize_credentials: false
    }
  ],
  relayfee: 0.00001,
  incrementalfee: 0.00001,
  localaddresses: [],
  warnings: '',
}
const NetworkInfoSchema = new Schema({
  tag: {
    type: String, required: true,
    lowercase: true, trim: true,
    index: true, sparse: true, enum: ["latest"],
  },

  version: { type: Number, },
  subversion: { type: String, trim: true, },
  protocolversion: { type: Number, },
  localservices: { type: String, lowercase: true, trim: true, },
  localservicesnames: { type: Schema.Types.Mixed },
  //localservicesnames: [{ type: String, uppercase: true, trim: true, }],
  localrelay: { type: Boolean, },
  timeoffset: { type: Number, },
  networkactive: { type: Boolean, },
  connections: { type: Number, },
  networks: { type: Schema.Types.Mixed },
  /*
  networks: [{
    name: { type: String, lowercase: true, trim: true, },
    limited: { type: Boolean, },
    reachable: { type: Boolean, },
    proxy: { type: String, lowercase: true, trim: true, },
    proxy_randomize_credentials: { type: Boolean, },
  }],
  */
  relayfee: { type: Number, }, // !?! конвертация в сатоши?
  incrementalfee: { type: Number, }, // !?! конвертация в сатоши?
  localaddresses: { type: Schema.Types.Mixed },
  //localaddresses: [{ type: String, lowercase: true, trim: true, }],
  warnings: { type: String, trim: true, },
}, {
  versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

const NetworkInfo = mongoose.model('NetworkInfo', NetworkInfoSchema);

module.exports = NetworkInfo;
module.exports.NetworkInfoSchema = NetworkInfoSchema;
