const {Worker , isMainThread , workerData }=require('worker_threads');

if(isMainThread)
{
    console.log(`main thread : ${process.pid}`);
    new Worker(__filename ,{workerData : [10,8,7,2]});
    new Worker(__filename , {workerData : [20,18,17,12]});
    new Worker(__filename , {workerData : [30,28,27,22]});
}
else
{
    console.log(`worker thread : ${process.pid}`);
    console.log(`${workerData} sorted is ${workerData.sort((a,b)=>{return a-b})}`);
}