/*
 * ISC License (ISC)
 * Copyright (c) 2018 aeternity developers
 *
 *  Permission to use, copy, modify, and/or distribute this software for any
 *  purpose with or without fee is hereby granted, provided that the above
 *  copyright notice and this permission notice appear in all copies.
 *
 *  THE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 *  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 *  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 *  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 *  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 *  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *  PERFORMANCE OF THIS SOFTWARE.
 */
const {Universal, MemoryAccount, Node} = require('@aeternity/aepp-sdk');
 

const ORIGINS_CONTRACT = utils.readFileRelative('./contracts/FreedomOrigins.aes', 'utf-8');


const config = {
    url: 'http://localhost:3001/',
    internalUrl: 'http://localhost:3001/',
    compilerUrl: 'http://localhost:3080'
};

describe('Origins Contract', () => {
    let client, nonClient, originsContract;
  
    before(async () => {
        client = await Universal({
            nodes: [{
                name: 'devnetNode',
                instance: await Node(config)
            }],
            accounts: [MemoryAccount({
                keypair: wallets[0]
            })],
            networkId: 'ae_devnet',
            compilerUrl: config.compilerUrl
        });
        nonClient = await Universal({
            nodes: [{
                name: 'devnetNode',
                instance: await Node(config)
            }],
            accounts: [MemoryAccount({
                keypair: wallets[1]
            })],
            networkId: 'ae_devnet',
            compilerUrl: config.compilerUrl
        });
    });

    it('Deploying Origins  Contract', async () => {
        originsContract = await client.getContractInstance(ORIGINS_CONTRACT);
       
        const init = await originsContract.methods.init();
        assert.equal(init.result.returnType, 'ok');
    });

    it('Add admin', async () => {
        let works = await originsContract.methods.add_user("omar@mail.com","Omar",1,wallets[0].publicKey);
        assert.equal(works.result.returnType, 'ok');
    });
    it('List authorized user', async () => {
        
        let users = await originsContract.methods.get_users().catch(e => e);
        console.log(users.decodedResult)
        
    });
    it('Login authorized user', async () => {
        
        let user = await originsContract.methods.user_registration().catch(e => e);
       
        assert.equal(user.result.returnType,'ok', 'user dont exist') 
    });
    it('Login unauthorized user', async () => {
        
        originsContract = await nonClient.getContractInstance(ORIGINS_CONTRACT, {contractAddress: originsContract.deployInfo.address});
        let user = await originsContract.methods.user_registration().catch(e => e);
       
        assert.equal(user,undefined) 
    });
  

 

});