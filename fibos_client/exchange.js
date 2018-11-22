var FIBOS = require("fibos.js");
var config = {
    chainId: "68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a",
    priKey: "5JNXWBS62ZUBUuTFwikcPGsuvMMMaFFBxhE3H8p8Poc3ZdTwhvj",
    httpEndpoint: "http://testnet.fibos.fo:8870",
    verbose: false,
}
var fibos_client = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
})

let ctx = fibos_client.contractSync("eosio.token");
let owner = "emiyagmtest1";
let eos2fo_quantity = "5.0000 EOS@eosio";
let memo = "exchange EOS to FO";

var result = ctx.exchangeSync(owner, eos2fo_quantity, `0.0000 FO@eosio`, memo, {
    authorization: owner
});
console.log(result);

var rs = fibos_client.getTableRowsSync(true, "eosio.token", "emiyagmtest1", "accounts");
console.log(rs);

