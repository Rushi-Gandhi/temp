const planets = require('../../model/planets.model');

function httpGetAllPlanets(req,res){
return res.status(200).json(planets.getAllPlanets());
}

module.exports = httpGetAllPlanets;