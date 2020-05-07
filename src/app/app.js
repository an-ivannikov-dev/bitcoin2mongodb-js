const EventEmitter = require('events');
const zmq = require('zeromq/v5-compat');
const cfg = require('../config');
const logger = require('../logger');


const DEFAULT_OPTIONS = {};


class App extends EventEmitter {
  constructor(options = {}) {
    super();
    this.state = {};
    this.init(options);
  }

  init(options = {}) {
    this.log = logger.getLogger('App');
    this.log.trace('init() start.');

    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    this.cfg = cfg;
    this.setupZmqEventHandlers();

    this.log.trace('init() end.');
    return this;
  }


  launch() {
    this.log.trace('launch() start.');

    this.launchZMQ();

    this.log.trace('launch() end.');
    return this;
  }


  launchZMQ() {
    this.log.trace('launchZMQ() start.');

    const sock = zmq.socket('sub');
    const zmqConfig = this.cfg.get('bitcoin.zmq');
    const addr = `tcp://${zmqConfig.host}:${zmqConfig.port}`;
    sock.connect(addr);
    zmqConfig.subscriptions.forEach((item) => {
      sock.subscribe(item); // ["hashblock", "hashtx", "rawblock", "rawtx"]
    });
    sock.on('message', zmqMessageHandler.bind(this));

    this.log.trace('launchZMQ() end.');
    return this;
  }


  setupZmqEventHandlers() {
    this.log.trace('setupZmqEventHandlers() start.');

    getZmqEventHandlers().forEach((item) => {
      this.on(item.event, item.handler);
    });

    this.log.trace('setupZmqEventHandlers() end.');
    return this;
  }
}


module.exports = App;


function zmqMessageHandler(topic, message) {
  const name = 'zmqMessageHandler';
  const log = logger.getLogger(name);
  log.trace('start.');

  const app = this;
  const subscriptions = app.cfg.get('bitcoin.zmq.subscriptions');
  if (subscriptions.includes(topic.toString())) {
    switch (topic.toString()) {
      case 'hashblock': {
        const hex = message.toString('hex');
        log.trace(`on 'hashblock', hash:`, hex);
        app.emit('ZMQ_ON_HASHBLOCK', hex);
        break;
      }
      case 'hashtx': {
        const hex = message.toString('hex');
        log.trace(`on 'hashtx', hash:`, hex);
        app.emit('ZMQ_ON_HASHTX', hex);
        break;
      }
      case 'rawblock': {
        const hex = message.toString('hex');
        log.trace(`on 'rawblock', raw:`, hex);
        app.emit('ZMQ_ON_RAWBLOCK', hex);
        break;
      }
      case 'rawtx': {
        const hex = message.toString('hex');
        log.trace(`on 'rawtx', raw:`, hex);
        app.emit('ZMQ_ON_RAWTX', hex);
        break;
      }
      default: {
        log.warn(`on '${topic.toString()}' is not defined!`);
        break;
      }
    }
  } else {
    log.error(`ZMQ not subscribed for '${topic.toString()}'!`);
  }

  log.trace('end.');
}


function getZmqEventHandlers() {
  const name = 'getZmqEventHandlers';
  const log = logger.getLogger(name);
  log.trace('start.');

  const zmqEventHandlers = [{
    event: 'ZMQ_ON_HASHBLOCK',
    handler: function () {
      const app = this;
      app.log.trace(`on 'ZMQ_ON_HASHBLOCK'`);
      const subscriptions = app.cfg.get('bitcoin.zmq.subscriptions');
      if (!subscriptions.includes('hashblock'))
        return app.log.error(`ZMQ not subscribed for 'hashblock'!`);
    },
  }, {
    event: 'ZMQ_ON_HASHTX',
    handler: function () {
      const app = this;
      app.log.trace(`on 'ZMQ_ON_HASHTX'`);
      if (!subscriptions.includes('hashtx'))
        return app.log.error(`ZMQ not subscribed for 'hashtx'!`);
    },
  }, {
    event: 'ZMQ_ON_RAWBLOCK',
    handler: function () {
      const app = this;
      app.log.trace(`on 'ZMQ_ON_RAWBLOCK'`);
      if (!subscriptions.includes('rawblock'))
        return app.log.error(`ZMQ not subscribed for 'rawblock'!`);
    },
  }, {
    event: 'ZMQ_ON_RAWTX',
    handler: function () {
      const app = this;
      app.log.trace(`on 'ZMQ_ON_RAWTX'`);
      if (!subscriptions.includes('rawtx'))
        return app.log.error(`ZMQ not subscribed for 'rawtx'!`);
    },
  }];

  log.trace('end.');
  return zmqEventHandlers;
}
