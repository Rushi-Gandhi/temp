const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

function loadPalnetData (){
    return new Promise((resolve , reject) =>{
        function isHabitablePlanet(planet){
            return planet['koi_disposition'] === 'CONFIRMED'
                 && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
                 && planet['koi_prad'] < 1.6;
        }
        
        function findPlanetName(planet) {
            return planet['kepler_name']  ;
        }
        fs.createReadStream(path.join(__dirname ,'..','..','data','kepler_data.csv'))
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
                reject(error);            })
            .on('end', () => {
                 resolve(habitablePlanets.map(findPlanetName));
            });
    })
}

module.exports = {
    loadPalnetData,
    planets : habitablePlanets};