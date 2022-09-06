const { existesLauchWithId,getAllLaunches , scheduleNewLaunch ,abortLaunchById} = require("../../model/launchs.model")

async function httpGetAllLaunches(req,res){
   return res.status(200).json(await getAllLaunches());
    };

async function httpAddNewLaunch(req,res){
    const launch = req.body ;
    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate)
    {
        return res.status(400).json({error : "Invalid data" })
    }
    launch.launchDate = new Date(launch.launchDate);

    if(isNaN(launch.launchDate))
    {
        return res.status(400).json({error : "Invalid date" })

    }
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}    

async function httpAbortLaunch(req, res){
    const launchId = +req.params.id
    const existsLaunch = await existesLauchWithId(launchId);
    if(!existsLaunch){
        return res.status(404).json({error : 'Launch Not Found'})
    }
    const aborted = await abortLaunchById(launchId);
    if(!aborted)
    {
        return res.status(400).json({error : 'launch not aborted'})
    }
    res.status(200).json({aborted : aborted});


}

module.exports ={httpGetAllLaunches ,httpAddNewLaunch , httpAbortLaunch }