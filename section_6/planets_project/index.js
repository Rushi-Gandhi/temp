const { parse } = require('csv-parse');
const fs = require('fs');
const habitablePlanets = [];

function isHabitablePlanet(planet){
    //planet is array
    // planet['koi_disposition'] is key of object
    // 'CONFIRMED' is value of that key
    return planet['koi_disposition'] === 'CONFIRMED'
         && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
         && planet['koi_prad'] < 1.6;
}

function findPlanetName(planet) {
    return planet['kepler_name']  ;
}

//extra
function findPlanetNameWithID(planet) {
    return {
                id : planet['kepid'],
                name  : planet['kepler_name']
            }  ;
}

fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment : "#" , 
    columns : true}))
    .on('data', (data) => {
        if(isHabitablePlanet(data))
        {
            habitablePlanets.push(data)
        }
        
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('end', () => {
         console.log(habitablePlanets.map(findPlanetName));
         console.log(habitablePlanets.map(findPlanetNameWithID));
         //https://www.w3schools.com/jsref/jsref_map.asp
         console.log( `habitablePlanets : ${habitablePlanets.length}`);
    });


