var FIBOS = require('fibos.js');

var config = {
  chainId: '68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a', // 32 byte (64 char) hex string
  // keyProvider: '5KCJjKAVDnXggcNpQtet2uJaaqvKhEfmkh7osAxx1QpZuMAPuwi', // WIF string or array of keys..
  httpEndpoint: 'https://testnet.fibos.fo',
  logger: {
    log: null,
    error: null
  }
}

var fibos = FIBOS(config);
var result = fibos.getTableRowsSync(true, "eosio.token", "emiyagm12345", "accounts")
console.log(result);
