var FIBOS = require('fibos.js');
var config = require('../config');
var fs = require('fs');
var test = require('test');
test.setup();

describe(`todo`, () => {
    var fibosClient; 
    before(() => {
        fibosClient = FIBOS({
            chainId: config.client.chainId, // 32 byte (64 char) hex string
            keyProvider: config.client.keyProvider, 
            httpEndpoint: config.client.httpEndpoint,
            logger: {
                log: null,
                error: null
            }
        }); 
        fibosClient.newaccountSync({
            creator: 'eosio',
            name: config.test.name,
            owner: config.account.publicKey,
            active: config.account.publicKey,
        });
     // setcode
     const jsCode = fs.readTextFile('../todo.js');
     fibosClient.setcodeSync(config.test.name, 0, 0, fibosClient.compileCode(jsCode));
     
     // setabi
     const abi = JSON.parse(fs.readTextFile('../todo.abi'));
     fibosClient.setabiSync(config.test.name, abi);
    })

    it(`insert data`, () => {
        var ctx = fibosClient.contractSync(config.test.name);
        ctx.emplacetodoSync(1,"say something",0, {
            authorization: config.test.name
        });
        console.notice('fibos.getTableRowsSync(true, config.test.name, user1, todos)',
        fibosClient.getTableRowsSync(true, config.test.name, config.test.sender, 'todos'));
    });

    it(`find data`, () => {
        var ctx = fibosClient.contractSync(config.test.name);
        ctx.findtodoSync(1,{
            authorization: config.test.name
        })
        console.notice('fibos.getTableRowsSync(true, config.test.name, user1, todos)', 
        fibosClient.getTableRowsSync(true, config.test.name, config.test.sender, 'todos'));
    });

    it(`user modofy record`, () => {
        var ctx = fibosClient.contractSync(config.test.name);
        ctx.updatetodoSync(1,"done",1,{
            authorization: config.test.name
        })
        assert.isTrue(fibosClient.getTableRowsSync(true, config.test.name, config.test.sender, 'todos').rows.length === 1);
    });

    it(`user delete record`, () => {
        var ctx = fibosClient.contractSync(config.test.name);
        ctx.destorytodoSync(1,{
            authorization: config.test.name
        })
        assert.isTrue(fibosClient.getTableRowsSync(true, config.test.name, config.test.sender, 'todos').rows.length === 0);
    });
})

require.main === module && test.run(console.DEBUG);