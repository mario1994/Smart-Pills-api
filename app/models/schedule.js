const database = require('../../knex/knex.js'); 
const debug = require('debug')('my-namespace');

const updateSchedule = (scheduleReq) =>{
	return database.raw(
			"UPDATE schedules SET monday= ?, tuesday= ? ,wednesday= ?,thursday= ?,friday= ?,saturday= ?,sunday= ?,schedule_time= ? WHERE schedule_id = ? RETURNING schedule_id,bottle_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,schedule_time,created_at",
			[scheduleReq.monday,scheduleReq.tuesday,scheduleReq.wednesday,scheduleReq.thursday,scheduleReq.friday,scheduleReq.saturday,scheduleReq.sunday,scheduleReq.schedule_time,scheduleReq.schedule_id]
			)
			.then((data) => data.rows[0])
			.catch((error) => {
      return new Promise((resolve, reject) => {
        reject("invalid schedule data sent");
        })
    })
}

const findSchedule = (bottleId) =>{
	return database.raw("SELECT * FROM schedules WHERE bottle_id = ?", [bottleId])
    .then((data) => {
      if(data.rowCount !=0){
        return data.rows[0];
      }else{
        return new Promise((resolve, reject) => {
        reject({"error":"schedule not found"});
        })
      }
  })
}

const updateBottleSchedule = (request,response) =>{
	const scheduleReq = request.body
	updateSchedule(scheduleReq)
    .then((updatedSchedule) => {
      response.status(201).json({bottleSchedule:updatedSchedule});
    })
    .catch((error) => {
      response.status(404).json({error});
    })
}

const getBottleSchedule = (request,response) => {
	const bottleId = request.params.bottle_id;
	findSchedule(bottleId)
	.then((schedule)=>{
		response.status(200).json({bottleSchedule:schedule})
	})
	.catch((error) => {
      response.status(404).json(error);
    })
}

module.exports = {
  updateBottleSchedule,
  getBottleSchedule
}