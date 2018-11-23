var FIBOS = require('fibos.js')
var fs = require("fs");
var config = {
    "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    "producer-name": "eosio",
    "public-key": "FO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "httpEndpoint": "http://127.0.0.1:8888",
};

// new FIBOS client
var fibos = FIBOS({
    chainId: config["chainId"],
    keyProvider: config["private-key"],
    httpEndpoint: config["httpEndpoint"],
    logger: {
        log: null,
        error: null
    }
});

var contractName = "emiyagmtest1";

//call abi
var ctx = fibos.contractSync(contractName);
ctx.calccwSync(5000000000, 0.001, 8000000000, 0.045, {
    authorization: contractName
});

console.notice(fibos.getTableRowsSync(true, contractName, contractName, 'cws'));