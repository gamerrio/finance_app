//Cryptohrphic libaries
const assert = require('node:assert');
const fs = require('fs');
const { createECDH, } = require('node:crypto');


//Database Connection(MongoDb)
const { MongoClient, ServerApiVersion, AutoEncryptionLoggerLevel } = require('mongodb');
const uri = "mongodb+srv://rio:root@cluster0.y4qh2ob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: false, deprecationErrors: true, } });
const dbo = client.db('KeysDB').collection('PublicKeys');


// Webserver Files
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/acc', async function (req, res) {
    const alice = createECDH('secp521r1');
    let accno = req.query.accno;
    const aliceKey = alice.generateKeys('base64');
    const alicePublicKey = alice.getPublicKey('base64');
    const alicePrivateKey = alice.getPrivateKey('base64');
    const prime = alice.getPrime('base64');
    const generator = alice.getGenerator('base64');
    console.log(`Alice Public key Genrated : ${alicePublicKey}\n Alice Private Key : ${alicePrivateKey}\n`)
    var myobj = { accno: accno, Pubkey: alicePublicKey, PvteKey: alicePrivateKey, generator: generator, prime: prime };
    const record = await dbo.insertOne(myobj);
    res.send({ id: record.insertedId, accno: accno, key: alicePrivateKey });
});


const alice = createECDH('secp521r1');
fs.writeFileSync('./alicekey', alice.generateKeys().toString('base64'), { encoding: 'utf-8' });

// Generate Bob's keys...
const bob = createECDH('secp521r1');
fs.writeFileSync('./bobkey', bob.generateKeys().toString('base64'), { encoding: 'utf-8' });


// Exchange and generate the secret...
var alicekey = Buffer.from(fs.readFileSync('./alicekey', { encoding: 'utf-8' }), 'base64');
var bobkey = Buffer.from(fs.readFileSync('./bobkey', { encoding: 'utf-8' }), 'base64');
const aliceSecret = alice.computeSecret(bobkey);
const bobSecret = bob.computeSecret(alicekey);

assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
console.log(aliceSecret.toString('hex') == bobSecret.toString('hex'));
// OK