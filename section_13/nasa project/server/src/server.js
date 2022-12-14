const http = require('http');
const app = require('./app');
const dotenv = require('dotenv').config();
const {loadPalnetData} = require('./model/planets.model');
const {loadLaunchData} = require('./model/launchs.model');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 5000 ;
const server = http.createServer(app);

async function startServer(){
    await mongoConnect();
    await loadPalnetData();
    await loadLaunchData();
    server.listen(PORT ,()=>{
        console.log(`📡 server is listen on port ${PORT}`);
    } );
}

startServer();

 