const http = require('http');
const app = require('./app');
const {loadPalnetData} = require('./model/planets.model');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 4000 ;
const server = http.createServer(app);

async function startServer(){
    await mongoConnect();
    await loadPalnetData();
    server.listen(PORT ,()=>{
        console.log(`📡 server is listen on port ${PORT}`);
    } );
}

startServer();

 