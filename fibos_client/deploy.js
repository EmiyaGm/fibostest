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

var contractName = "chart";

//新建 hello 账户
fibos.newaccountSync({
  creator: 'eosio',
  name: "emiyagmtest1",
  owner: config["public-key"],
  active: config["public-key"]
});


//setcode
var js_code = fs.readTextFile("./chart/chart.js");
fibos.setcodeSync("emiyagmtest1", 0, 0, fibos.compileCode(js_code));

//getcode
var code = fibos.getCodeSync("emiyagmtest1", true);

console.log("code:", code);

//setabi
var abi = JSON.parse(fs.readTextFile("./chart/chart.abi"));
fibos.setabiSync("emiyagmtest1", abi);