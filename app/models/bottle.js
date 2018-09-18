const database = require('../../knex/knex.js'); 
const debug = require('debug')('my-namespace')

const createBottle = (bottle) => {
  return database.raw(
    "INSERT INTO bottles (bottle_id, user_id,bottle_opens) VALUES (?, ?, ?) RETURNING bottle_id, user_id, bottle_opens",
    [bottle.bottle_id, bottle.user_id, 0]
  )
  .then((data) => data.rows[0])
  .catch((error) => {
      return new Promise((resolve, reject) => {
        reject("bottle already registered");
        })
    })
}

const updateBottleOpens = (bottleId) =>{
	return database.raw("UPDATE bottles SET bottle_opens = bottle_opens +1 WHERE bottle_id = ?", [bottleId])
    .then((data) => {
      if(data.rowCount !=0){
        return data.rows[0];
      }else{
        return new Promise((resolve, reject) => {
        reject({"error":"bottle not found"});
        })
      }
  })
}
const findBottle = (bottleId) => {
  return database.raw("SELECT * FROM bottles WHERE bottle_id = ?", [bottleId])
    .then((data) => {
      if(data.rowCount !=0){
        return data.rows[0];
      }else{
        return new Promise((resolve, reject) => {
        reject({"error":"bottle not found"});
        })
      }
  })
}

const createEmptySchedule = (bottleId) =>{
	return database.raw(
			"INSERT INTO schedules (bottle_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,schedule_time,created_at) VALUES (?,?,?,?,?,?,?,?,?,?) RETURNING schedule_id,bottle_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,schedule_time,created_at",
			[bottleId,false,false,false,false,false,false,false,null,new Date()]
			)
			.then((data) => {
				debug(data);
				return data.rows[0]
			})
			.catch((error) => {
      return new Promise((resolve, reject) => {
        reject("invalid schedule data sent");
        })
    })
}

const removeBottle = (bottleId) =>{
   return database('schedules').where({bottle_id:bottleId}).del()
   .then(() => {
     return database('measurements').where({bottle_id:bottleId}).del()
   })
   .then(() => {
     return database('bottles').where({bottle_id:bottleId}).del()
   })
   .catch((error) => {
      return new Promise((resolve, reject) => {
        reject("delete failed");
        })
    })  
}
    
const openBottle = (request, response) => {
  const bottleId = request.body.bottle_id
  let bottle
  	 updateBottleOpens(bottleId)
    .then(() => {
      response.status(200)
    })
    .catch(err => {
      debug(err);
      response.status(404).json(err);
    })
}

const registerBottle = (request, response) => {
  const bottle = request.body
	createBottle(bottle)
    .then((createdBottle) => {
      var schedule = createEmptySchedule(bottle.bottle_id);
      response.status(201).json(createdBottle)
    })
    .catch((error) => {
      response.status(404).json({error});
    })
}

const getBottleData = (request,response) =>{
	const bottleId = request.params.bottle_id;
	findBottle(bottleId)
	.then((bottle) => {
		response.status(200).json(bottle)
	})
	.catch((error) => {
      response.status(404).json(error);
    })
}

const deleteBottle = (request,response) =>{
  const bottleId = request.params.bottle_id;
  removeBottle(bottleId)
  .then(() => {
    response.status(200).json({result:"bottle succesfully deleted"});
  })
  .catch((error) => {
      response.status(404).json(error);
    })
}


module.exports = {
  openBottle,
  registerBottle,
  getBottleData,
  deleteBottle
}