const fs = require('fs');
const path = require('path');
const planets = require('./planets.mongo')
const { parse } = require('csv-parse');

function loadPalnetData() {
    return new Promise((resolve, reject) => {
        function isHabitablePlanet(planet) {
            return planet['koi_disposition'] === 'CONFIRMED'
                && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
                && planet['koi_prad'] < 1.6;
        }

        function findPlanetName(planet) {
            return planet['kepler_name'];
        }
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: "#",
                columns: true
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {   // insert + update = upsert
                    //habitablePlanets.push(data);
                    await savePlanets(data);

                }

            })
            .on('error', (error) => {
                reject(error);
            })
            .on('end', async () => {
                const planetsCount = (await getAllPlanets()).length;
                console.log(`${planetsCount} habitable planets found`);
                resolve();
            });
    })
}

async function getAllPlanets() {
    return await planets.find({} ,{__v : 0 , _id : 0});
}

async function savePlanets(planet) {
    try {
        await planets.updateOne({
            kepler_name: planet.kepler_name
        },
            { kepler_name: planet.kepler_name },
            { upsert: true });
    }
    catch (err) {
        console.error(err);
    }

}

module.exports = {
    loadPalnetData,
    getAllPlanets
};