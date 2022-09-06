const axios = require('axios')
const launches = require('../model/launches.mongo');
const planets = require('../model/planets.mongo');
const DEFULT_FLIGHT_NUMBER = 1
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

//const launches = new Map();
var latestFlightNumber = 1;
const launch = {
    fligthNumber: latestFlightNumber, //flight_number
    mission: 'mission mars',//name
    rocket: 'pslv-3',//rocket.name
    target: "Kepler-1652 b",//not applicable
    launchDate: new Date('April 10 ,2023'),//date_local
    customer: ['ZTM', 'NASA'], // payload.customers for each payload
    upcoming: true,//upcoming
    success: true //success
};
saveLaunch(launch);
//launches.set(launch.fligthNumber, launch);

async function findLaunch(filter){
    return await launches.findOne(filter);
}

async function existesLauchWithId(launchId) {
    return await launches.findLaunch({ fligthNumber: launchId });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-fligthNumber');
    if (!latestLaunch) {
        return DEFULT_FLIGHT_NUMBER;
    }
    return latestLaunch.fligthNumber;
}
async function getAllLaunches() {
    // return Array.from(launches.values());
    return await launches.find({}, { __v: 0, _id: 0 });
}

// function addNewLaunch(launch) {
//     latestFlightNumber++;
//     return launches.set(latestFlightNumber, Object.assign(launch, {
//         fligthNumber: latestFlightNumber, 
//         customer: ['RUSHI', 'NASA'],
//         upcoming: true,
//         success: true
//     }));
// }

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({ kepler_name: launch.target });

    if (!planet) {
        console.log('no matching planets found');
    }
    else{
    const newFlightNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        fligthNumber: newFlightNumber,
        customer: ['RUSHI', 'NASA'],
        upcoming: true,
        success: true
    });

    await saveLaunch(newLaunch);
}

}

async function abortLaunchById(launchId) {
    //launches.delete(id);
    // const aborted = launches.get(launchId)
    // aborted.upcoming = false;
    // aborted.success = false ;


    const aborted = await launches.updateOne({ fligthNumber: launchId }, { upcoming: false, success: false });
    return aborted.modifiedCount === 1;


}

async function saveLaunch(launch) {
        await launches.updateOne({ fligthNumber: launch.fligthNumber }, launch, { upsert: true });
}


async function loadLaunchData() {
   const firstLaunch = await findLaunch({fligthNumber :1 ,rocket : 'Falcon 1', mission : 'FalconSat' });
   console.log(firstLaunch);
   if(firstLaunch){
       console.log('launch data already in database');
       
       return;
   }
   else
   {
        await populateLaunches();
   }
    
}


async function populateLaunches()
{
    console.log('downloading data from spacex');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination : false ,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });

    const launchData = response.data.docs;

    for(const launchDoc of launchData){
        const payloads = launchDoc['payloads'];
        const customers =  payloads.flatMap((payload)=>{return payload['customers']})
        const launch = {
            fligthNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            //target: "Kepler-1652 b",//not applicable
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customer: customers,

        }
       // console.log(launch.fligthNumber , launch.mission);

        //TODO : populate launches collection....
        await saveLaunch(launch);
    }
}
module.exports = {
    existesLauchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
    loadLaunchData
}