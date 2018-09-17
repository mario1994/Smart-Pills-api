const database = require('../../knex/knex.js'); 
const debug = require('debug')('my-namespace')


const findMeasurements = (bottleId) => {
	return database.raw("SELECT temperature_value,created_at FROM measurements WHERE bottle_id = ? AND created_at >= ?;", [bottleId,new Date(new Date(Date.now() - 26 * 3600 * 1000))])
	.then((data)=> {
        var temperatureArray = [];
        var timeArray = [];
        var result = [];
        for  (var i = 0; i < data.rowCount; i++){
        temperatureArray.push(data.rows[i].temperature_value);
        timeArray.push(data.rows[i].created_at);
      }
      	temperatureArray = {temperature:temperatureArray}
      	timeArray = {time:timeArray}
      	dataArray = [temperatureArray,timeArray];
        return dataArray;
    })
}

const createMeasurement = (measurement) => {
	return database.raw(
			"INSERT INTO measurements (bottle_id,temperature_value,created_at) VALUES (?,?,?) RETURNING measurement_id,bottle_id,temperature_value,created_at",
			[measurement.bottle_id,measurement.temperature_value,new Date()]
			)
			.then((data) => data.rows[0])
			.catch((error) => {
      return new Promise((resolve, reject) => {
        reject("invalid measurement data sent");
        })
    })
}

const registerTemperatureMeasurement = (request, response) => {
	const measurement = request.body
	createMeasurement(measurement)
    .then((createMeasurement) => {
      response.status(201).json(createMeasurement)
    })
    .catch((error) => {
      response.status(404).json(error);
    })
}

const getMeasurements = (request,response) =>{
	const bottleId = request.params.bottle_id;
	debug(bottleId);
	findMeasurements(bottleId)
	.then((measurements) => {
		response.status(200).json(measurements)
	})
	.catch((error) => {
      response.status(404).json(error);
    })
}

module.exports = {
  registerTemperatureMeasurement,
  getMeasurements,
}