const https = require('https');
const fs = require('fs');
const app = require('./index');
require('dotenv').config();
const PORT = process.env.PORT

const server = https.createServer({key : fs.readFileSync('key.pem') , cert :fs.readFileSync('cert.pem')},app);

server.listen(PORT,()=>{
    console.log(`server is listen on port ${PORT}`);
})