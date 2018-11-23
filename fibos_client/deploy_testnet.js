var FIBOS = require('fibos.js')
var fs = require("fs");
var config = {
    "chainId": "68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a",
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

var contractName = "chart";

//setcode
var js_code = fs.readTextFile("./chart/chart.js");
fibos.setcodeSync(contractName, 0, 0, fibos.compileCode(js_code));

//getcode
var code = fibos.getCodeSync(contractName, true);

console.log("code:", code);

//setabi
var abi = JSON.parse(fs.readTextFile("./chart/chart.abi"));
fibos.setabiSync(contractName, abi);