const launches = require('../model/launches.mongo');
const planets = require('../model/planets.mongo');
const DEFULT_FLIGHT_NUMBER = 1

//const launches = new Map();
var latestFlightNumber = 1;
const launch = {
    fligthNumber: latestFlightNumber,
    mission: 'mission mars',
    rocket: 'pslv-3',
    target : "Kepler-1652 b",
    launchDate: new Date('April 10 ,2023'),
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};
 saveLaunch(launch);
//launches.set(launch.fligthNumber, launch);

async function existesLauchWithId (launchId) {
    return await launches.findOne({fligthNumber : launchId});
}

async function getLatestFlightNumber (){
    const latestLaunch = await launches.findOne().sort('-fligthNumber');
    if(!latestLaunch)
    {
        return DEFULT_FLIGHT_NUMBER ;
    }
    return latestLaunch.fligthNumber;
}
async function getAllLaunches() {
   // return Array.from(launches.values());
   return await launches.find({} ,{__v : 0 , _id : 0});
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

async function scheduleNewLaunch(launch){
    const newFlightNumber =  await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
                fligthNumber: newFlightNumber, 
                customer: ['RUSHI', 'NASA'],
                upcoming: true,
                success: true
            });

            await saveLaunch(newLaunch);

}

async function abortLaunchById(launchId){
    //launches.delete(id);
    // const aborted = launches.get(launchId)
    // aborted.upcoming = false;
    // aborted.success = false ;

   
    const aborted = await launches.updateOne({fligthNumber : launchId} , {upcoming : false ,success : false});
    return aborted.modifiedCount === 1;

   
}

async function  saveLaunch (launch){
    const planet = await planets.findOne({kepler_name : launch.target}) ;

    if(!planet)
    {
      console.log('no matching planets found');
    }
    else{
        await launches.updateOne({fligthNumber : launch.fligthNumber},launch,{upsert : true});

    }
}

module.exports = {
    existesLauchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById
}