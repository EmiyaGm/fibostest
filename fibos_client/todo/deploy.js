const FIBOS = require('fibos.js');
const config = require('./config');
const fibosClient = FIBOS(config.client);
const fs = require('fs');

fibosClient.newaccountSync({
    creator: 'eosio',
    name: 'todo',
    owner: config.account.publicKey,
    active: config.account.publicKey,
});

const jsCode = fs.readTextFile('./todo.js');
const wasm = fibosClient.compileCode(jsCode);
fibosClient.setcodeSync(config.contract.name, 0, 0, wasm);
const code = fibosClient.getCodeSync(config.contract.name, true);
console.log(code);
const abi = JSON.parse(fs.readTextFile('./todo.abi'));
fibosClient.setabiSync(config.contract.name, abi);