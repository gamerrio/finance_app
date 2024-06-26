const express = require('express')
const assert = require('node:assert');
const { createDiffieHellman, } = require('node:crypto');
const { MongoClient, ServerApiVersion, AutoEncryptionLoggerLevel } = require('mongodb');
const app = express()
const port = 3000
const QRCode = require('qrcode');

const uri = "mongodb+srv://rio:root@cluster0.y4qh2ob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});
const dbo = client.db('KeysDB').collection('PublicKeys');



app.get('/', (req, res) => {
    res.send('Hello World!')
})


// Public and Private key Genration using DiffieHellman
// app.get('/acc', async function (req, res) {
//     const alice = createDiffieHellman(2048);
//     let accno = req.query.accno;
//     console.log(accno);
//     const aliceKey = alice.generateKeys('base64');
//     const alicePublicKey = alice.getPublicKey('base64');
//     const alicePrivateKey = alice.getPrivateKey('base64');
//     const prime = alice.getPrime('base64');
//     const generator = alice.getGenerator('base64');
//     console.log(`Alice Public key Genrated : ${alicePublicKey}\n Alice Private Key : ${alicePrivateKey}\n`)
//     var myobj = { accno: accno, Pubkey: alicePublicKey, PvteKey: alicePrivateKey, generator: generator, prime: prime };
//     const record = await dbo.insertOne(myobj);
//     res.send({ id: record.insertedId, accno: accno, key: alicePrivateKey });
// });

// using the bob key to generate secrete and create ciper text

app.get('/ciper', async function (req, res) {
    let raccno = req.query.raccno; //reciever account number ?raccno
    let saccno = req.query.saccno; //sender account number &saccno
    let amount = req.query.amount; //amount to be recieved
    data_string = raccno + "%" + saccno + "%" + amount;
    // const bobPublicKey = await dbo.findOne({ accno: raccno });
    // console.log(bobPublicKey);
    // const received = bobPublicKey;
    // const alicePrivateKey = await dbo.findOne({ accno: saccno });
    // const aliceDH = createDiffieHellman(received.prime, received.generator);
    // console.log(received.Pubkey);
    // const publicKeyArray = new TextEncoder().encode(atob(received.Pubkey));
    // aliceDH.setPublicKey(publicKeyArray);
    // const aliceSecret = aliceDH.computeSecret(publicKeyArray, 'hex');
    // const mykey = crypto.createCipher('aes-128-cbc', aliceSecret);
    // var mystr = mykey.update(data_string, 'hex', 'hex')
    // mystr += mykey.final('hex');

    // Qr Generation
    QRCode.toFile(`./qr.png`, data_string, function (err, url) {
        console.log(`QR Genrated! of ${data_string}`);
        res.sendFile(__dirname + `/qr.png`);
    })

});



// Error Handling
function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

app.use(function (req, res) {
    res.status(404);
    res.send({ error: "Sorry, can't find that" })
});
// 

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port 0.0.0.0: ${port}`)
})