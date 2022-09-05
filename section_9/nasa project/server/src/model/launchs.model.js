const launches = new Map();
var latestFlightNumber = 1;
const launch = {
    fligthNumber: latestFlightNumber,
    mission: 'mission mars',
    rocket: 'pslv-3',
    target : "kepler-186 f",
    launchDate: new Date('April 10 ,2023'),
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.fligthNumber, launch);

function existesLauchWithId (launchId) {
    return launches.has(launchId);
}
function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    return launches.set(latestFlightNumber, Object.assign(launch, {
        fligthNumber: latestFlightNumber, 
        customer: ['RUSHI', 'NASA'],
        upcoming: true,
        success: true
    }));
}

function abortLaunchById(launchId){
    //launches.delete(id);
    const aborted = launches.get(launchId)
    aborted.upcoming = false;
    aborted.success = false ;

    return aborted;
   
}

module.exports = {
    existesLauchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}