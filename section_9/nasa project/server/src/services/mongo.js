const mongoose = require('mongoose');
const MONGODB_URL = 'mongodb://localhost:27017/NASA';

mongoose.connection.once('open' , ()=>{console.log('mongodb connected');});
mongoose.connection.on('error' , (err)=>{console.error(err);});

async function mongoConnect(){
    await mongoose.connect(MONGODB_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {mongoConnect ,mongoDisconnect}