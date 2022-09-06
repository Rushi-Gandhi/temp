const express = require('express');
const app = express();
const cluster = require('cluster');

function delay(duration) {
    const currentTime = Date.now();
    while (Date.now() - currentTime < duration) { }
}

app.get('/', async (req, res) => {
    res.status(200).send(`process id :  ${process.pid}`);
})

app.get('/time', async (req, res) => {
    await delay(5000);
    res.status(200).send(`process id :  ${process.pid}`)
});

// cluster part
//for testing in chrome select preserve log & disable cache [check box]
console.log('hello');
if (cluster.isMaster) {
    console.log('master has been started');
    cluster.fork();
    cluster.fork();
    cluster.fork();

}
else {

    app.listen(3000, () => {
        console.log(`📡 server is listen on port 3000`);
    });
}

//pm2
// app.listen(3000, () => {
//     console.log(`📡 server is listen on port 3000`);
// });